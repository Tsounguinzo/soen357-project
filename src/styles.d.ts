// styles.d.ts

// Declare module with the same name as your CSS module file
declare module '*.module.css' {
    // Define a type for the CSS class names
    interface IClassNames {
      [className: string]: string;
    }
  
    // Export an object containing the class names
    const classNames: IClassNames;
    export default classNames;
  }
  