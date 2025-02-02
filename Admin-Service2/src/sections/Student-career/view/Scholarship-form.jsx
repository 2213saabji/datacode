import React, { useEffect } from 'react';

export default function ScholarshipForm() {
  // console.log('hiiiiiiiiiiiiiiiiiiiiiiiiiii')
  useEffect(() => {
    const createIframe = () => {
      const f = document.createElement('iframe');
      f.src =
        'https://forms.zohopublic.in/ashokatodaytechnologyprivate/form/ScholarshipApplication/formperma/2BqktYX4W4aIM2GpfR34BtOlEiGUFWUFCIuwHHiKDYQ?zf_rszfm=1';
      f.style.border = 'none';
      f.style.height = '577px';
      f.style.width = '90%';
      f.style.transition = 'all 0.5s ease';
      f.setAttribute('aria-label', 'Scholarship Application');

      const d = document.getElementById('zf_div_2BqktYX4W4aIM2GpfR34BtOlEiGUFWUFCIuwHHiKDYQ');
      d.appendChild(f);

      const handleMessage = (event) => {
        const evntData = event.data;
        if (evntData && evntData.constructor === String) {
          const zf_ifrm_data = evntData.split('|');
          if (zf_ifrm_data.length === 2 || zf_ifrm_data.length === 3) {
            const zf_perma = zf_ifrm_data[0];
            const zf_ifrm_ht_nw = `${parseInt(zf_ifrm_data[1], 10) + 15}px`;
            const iframe = document
              .getElementById('zf_div_2BqktYX4W4aIM2GpfR34BtOlEiGUFWUFCIuwHHiKDYQ')
              .getElementsByTagName('iframe')[0];
            if (iframe.src.includes('formperma') && iframe.src.includes(zf_perma)) {
              const prevIframeHeight = iframe.style.height;
              let zf_tout = false;
              if (zf_ifrm_data.length === 3) {
                iframe.scrollIntoView();
                zf_tout = true;
              }
              if (prevIframeHeight !== zf_ifrm_ht_nw) {
                if (zf_tout) {
                  setTimeout(() => {
                    iframe.style.height = zf_ifrm_ht_nw;
                  }, 500);
                } else {
                  iframe.style.height = zf_ifrm_ht_nw;
                }
              }
            }
          }
        }
      };

      window.addEventListener('message', handleMessage, false);

      return () => {
        window.removeEventListener('message', handleMessage, false);
      };
    };

    try {
      createIframe();
    } catch (e) {
      console.error(e);
    }

    // Ensure a cleanup function is always returned
    return () => {};
  }, []);

  return (
    <div style={{ marginTop: '30px' }} id="zf_div_2BqktYX4W4aIM2GpfR34BtOlEiGUFWUFCIuwHHiKDYQ" />
  );
}
