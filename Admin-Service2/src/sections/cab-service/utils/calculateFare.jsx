function calculateFare(distance, vehicleOption) {

    const {isNaN} = Number;
    // Validate vehicleOption
    if (typeof vehicleOption !== 'object' ||
        typeof vehicleOption.rentPerKm !== 'string' || 
        typeof vehicleOption.baseCharge !== 'string') {
      return -1; // Indicate invalid input
    }
  
    // Extract numeric value from distance string (assumes format like "215 km")
    const distanceMatch = distance.match(/^(\d+\.?\d*)\s*km$/);
    if (!distanceMatch) {
      return -1; // Indicate invalid input
    }
    
    const distanceValue = parseFloat(distanceMatch[1]);
    if (isNaN(distanceValue) || distanceValue < 0) {
      return -1; // Indicate invalid input
    }
  
    // Convert rentPerKm and baseCharge from strings to numbers
    const rentPerKm = parseFloat(vehicleOption.rentPerKm);
    const baseCharge = parseFloat(vehicleOption.baseCharge);
  
    // Check if conversions are valid numbers
    if (isNaN(rentPerKm) || isNaN(baseCharge) || rentPerKm < 0 || baseCharge < 0) {
      return -1; // Indicate invalid input
    }
  
    // Calculate total fare based on distance and rent per kilometer
    const totalFare = distanceValue * rentPerKm;
  
    // Return the greater of totalFare or baseCharge
    return Math.max(totalFare, baseCharge);
  }
  

  export default calculateFare;
