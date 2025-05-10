//Using for breadcrumbs 

export function useCamelCase() {
  function toCamelCase(str: string): string {
    return str.replace(/[^a-zA-Z0-9 ]/g, '') // Remove special characters .trim()
      .split(' ').map((word, index) => {
        if (index === 0) return word.toLowerCase();
        return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
      }).join('');
  }
  return {
    toCamelCase
  };
}