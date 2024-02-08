export const extractUniqueCategories = (data) => {
    const allCategories = data
      .map(template => template.category) // Map to get all categories
      .filter(category => category !== null) // Filter out null categories
      .flat(); // Flatten the array of arrays into a single array
    
    const uniqueCategories = [...new Set(allCategories)]; // Use Set to remove duplicates and convert back to array
    return uniqueCategories;
  }