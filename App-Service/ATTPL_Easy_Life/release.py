import os
import shutil
import zipfile
import logging
from datetime import datetime

# Set up logging
logging.basicConfig(level=logging.INFO,
                    format='%(asctime)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)


def check_java_installation():
    try:
        exit_code = os.system('java -version')
        if exit_code != 0:
            logger.error("Java is not installed or not in the system PATH.")
            return False
        return True
    except Exception as e:
        logger.error(f"Error checking Java installation: {str(e)}")
        return False


def check_file_exists(file_path, description):
    if not os.path.exists(file_path):
        logger.error(f"{description} not found at: {file_path}")
        return False
    return True


def check_android_project():
    if not os.path.exists('./android'):
        logger.error("Android project directory not found.")
        return False
    if not os.path.exists('./android/gradlew'):
        logger.error(
            "Gradle wrapper (gradlew) not found in the Android project.")
        return False
    return True


def create_new_release_project_directory(path, major, minor, patch, project_name, mode):
    try:
        if not os.path.exists(path):
            os.makedirs(path)
            logger.info(f"Created release directory: {path}")

        dir_list = os.listdir(path)
        directory = "0.0.0"
        if dir_list:
            directory = sorted(dir_list, reverse=True)[0]

        directory_version = directory.replace(
            project_name, "").replace("_", "")
        maj, min, pat = map(int, directory_version.split("."))

        if major.upper() == "Y":
            maj += 1
            min = pat = 0
        elif minor.upper() == "Y":
            min += 1
            pat = 0
        elif patch.upper() == "Y":
            pat += 1

        directory = f"{project_name}_{maj}.{min}.{pat}"
        full_path = os.path.join(path, directory)

        if not os.path.exists(full_path):
            os.makedirs(full_path, mode)
            os.makedirs(os.path.join(full_path, "apks"), mode)
            logger.info(f"Directory {full_path} created successfully!")
            return directory, maj, min, pat
        else:
            logger.warning(f"Directory {full_path} already exists!")
            return None
    except Exception as e:
        logger.error(f"Error creating directory: {str(e)}")
        return None


def run_command(command, cwd=None):
    try:
        current_dir = os.getcwd()
        if cwd:
            os.chdir(cwd)

        logger.info(f"Executing command: {command}")
        exit_code = os.system(command)

        if cwd:
            os.chdir(current_dir)

        if exit_code != 0:
            logger.error(f"Command failed with exit code: {exit_code}")
            return False
        return True
    except Exception as e:
        logger.error(f"Error executing command: {str(e)}")
        return False


def APK_release():
    logger.info("Final APK release started.")
    if run_command("gradlew bundleRelease", cwd="android"):
        logger.info("Final APK release completed.")
        return True
    else:
        logger.error("Final APK release failed.")
        return False


def aab_bundle_move_to_release_folder(root_source, new_directory, root_destination, project_name):
    logger.info("AAB bundle movement started.")
    try:
        if os.path.exists(root_source):
            destination = root_destination.format(new_directory, project_name)
            shutil.copy(root_source, destination)
            logger.info(f"AAB bundle moved to {destination}")
            return True
        else:
            logger.error(f"Source file {root_source} not found.")
            return False
    except Exception as e:
        logger.error(f"Error moving AAB bundle: {str(e)}")
        return False


def gradle_clean():
    logger.info("Gradle cleaning started.")
    if run_command("gradlew clean", cwd="android"):
        logger.info("Gradle cleaning completed.")
        return True
    else:
        logger.error("Gradle cleaning failed.")
        return False


def convert_aab_to_apk(bundletool_jar_file_path, aab_file_path, apks_file_path, key_store_file_path,
                       key_store_pwd, MYAPP_UPLOAD_KEY_ALIAS, MYAPP_UPLOAD_KEY_PASSWORD):
    command = (
        f"java -jar {bundletool_jar_file_path} build-apks --bundle={aab_file_path} "
        f"--output={apks_file_path} --mode=universal --ks={key_store_file_path} "
        f"--ks-pass=pass:{key_store_pwd} --ks-key-alias={MYAPP_UPLOAD_KEY_ALIAS} "
        f"--key-pass=pass:{MYAPP_UPLOAD_KEY_PASSWORD}"
    )
    return run_command(command)


def rename_unzip_delete_file(new_filename, new_directory):
    try:
        if os.path.exists(new_filename):
            with zipfile.ZipFile(new_filename, 'r') as zip_ref:
                zip_ref.extractall(f'./release/{new_directory}/apks')
            logger.info(f"Extracted contents of {new_filename}")
            os.remove(new_filename)
            logger.info(f"Deleted {new_filename}")
            return True
        else:
            logger.error(f"File {new_filename} not found.")
            return False
    except Exception as e:
        logger.error(f"Error processing zip file: {str(e)}")
        return False


def main():
    # Configuration
    root_source = "./android/app/build/outputs/bundle/release/app-release.aab"
    major, minor, patch = "Y", "N", "N"
    project_name = "ATTPL_EMS"
    path = "./release/"
    mode = 0o666
    bundletool_jar_file_path = "D:/java_jar_files/bundletool-all-1.16.0.jar"
    MYAPP_UPLOAD_STORE_FILE = "attpl-ems-key.keystore"
    MYAPP_UPLOAD_KEY_ALIAS = "attpl-ems-alias"
    MYAPP_UPLOAD_STORE_PASSWORD = "password123"
    MYAPP_UPLOAD_KEY_PASSWORD = "password123"
    key_store_file_path = f"./android/app/{MYAPP_UPLOAD_STORE_FILE}"

    # Check for required tools and files
    if not check_java_installation():
        return

    if not check_android_project():
        return

    if not check_file_exists(bundletool_jar_file_path, "Bundletool JAR"):
        return

    if not check_file_exists(key_store_file_path, "Keystore file"):
        return

    # Create release directory
    result = create_new_release_project_directory(
        path, major, minor, patch, project_name, mode)
    if not result:
        logger.error("Failed to create release directory. Exiting.")
        return

    new_directory, maj, min, pat = result
    root_destination = f"./release/{{0}}/{{1}}_{maj}.{min}.{pat}.aab"
    apks_file_path = f"./release/{new_directory}/apks/{
        project_name}_{maj}.{min}.{pat}.apks"

    # Build and move AAB
    if not APK_release():
        logger.error("APK release failed. Exiting.")
        return

    if not check_file_exists(root_source, "Generated AAB file"):
        return

    if not aab_bundle_move_to_release_folder(root_source, new_directory, root_destination, project_name):
        logger.error("Failed to move AAB bundle. Exiting.")
        return

    if not gradle_clean():
        logger.warning("Gradle clean failed. Continuing with the process.")

    # Convert AAB to APK
    aab_file_path = root_destination.format(new_directory, project_name)
    if not check_file_exists(aab_file_path, "AAB file in release directory"):
        return

    if not convert_aab_to_apk(
        bundletool_jar_file_path, aab_file_path, apks_file_path, key_store_file_path,
        MYAPP_UPLOAD_STORE_PASSWORD, MYAPP_UPLOAD_KEY_ALIAS, MYAPP_UPLOAD_KEY_PASSWORD
    ):
        logger.error("Failed to convert AAB to APK. Exiting.")
        return

    # Rename and extract APK
    zip_filename = f"./release/{new_directory}/apks/{
        project_name}_{maj}.{min}.{pat}.zip"
    os.rename(apks_file_path, zip_filename)
    if not rename_unzip_delete_file(zip_filename, new_directory):
        logger.error("Failed to process the APK zip file. Exiting.")
        return

    logger.info("Release process completed successfully.")


if __name__ == "__main__":
    main()