// UPDATED profileCompletion.js - Simplified for navigation fix

const checkProfileCompletion = (vendor) => {
  // Step 1: Vendor type selection
  const step1Complete = !!vendor.vendorType;
  
  // Step 2: Business information
  const step2Complete = !!(
    vendor.businessName &&
    vendor.businessAddress1 &&
    vendor.city &&
    vendor.state &&
    vendor.postalCode
  );
  
  // Step 3: Document verification
  let step3Complete = false;
  if (vendor.verificationType === 'gst') {
    step3Complete = !!(vendor.gstNumber && vendor.gstNumber.trim());
  } else if (vendor.verificationType === 'manual') {
    step3Complete = !!(vendor.idType && vendor.idNumber && vendor.idNumber.trim());
  }
  
  const steps = {
    step1: step1Complete,
    step2: step2Complete,
    step3: step3Complete,
  };

  const completedSteps = Object.values(steps).filter(Boolean).length;
  const totalSteps = Object.keys(steps).length;
  const completionPercentage = Math.round((completedSteps / totalSteps) * 100);

  // FIXED: Always return the next incomplete step, but don't use this for navigation
  // This is for display/progress purposes only
  let nextIncompleteStep = 1;
  if (step1Complete && !step2Complete) {
    nextIncompleteStep = 2;
  } else if (step1Complete && step2Complete && !step3Complete) {
    nextIncompleteStep = 3;
  } else if (step1Complete && step2Complete && step3Complete) {
    nextIncompleteStep = 4; // All complete
  }

  return {
    steps,
    completedSteps,
    totalSteps,
    completionPercentage,
    isComplete: completedSteps === totalSteps,
    currentStep: nextIncompleteStep, // This is for reference only, not navigation
    nextIncompleteStep,
  };
};

module.exports = { checkProfileCompletion };