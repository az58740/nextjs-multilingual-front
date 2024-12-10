

# My Next.js App with App Router and Paraglide-Next

Welcome to my Next.js application! This project uses the App Router feature of Next.js to manage routes and enhance user navigation. Additionally, it integrates the [Paraglide-Next](https://inlang.com/m/osslbuzt/paraglide-next-i18n/get-started#localized-navigation-apis) library for globalization, making it easy to support multiple languages and localizations.

For more information, see the [course curriculum](https://nextjs.org/learn) on the Next.js Website.
## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Usage](#usage)
- [Localization](#localization)
- [Contributing](#contributing)
- [License](#license)

## Features

- Next.js App Router for improved navigation
- Globalization support using Paraglide-Next
- Server-side rendering (SSR) for improved SEO
- Static site generation (SSG) for optimized performance

## Technologies Used

- [Next.js](https://nextjs.org/) - A React framework for server-rendered applications.
- [Paraglide-Next](https://github.com/opral/monorepo/tree/main/inlang/source-code/paraglide/paraglide-next/examples/app) - A library for managing internationalization in Next.js applications.
- React - A JavaScript library for building user interfaces.
- CSS Modules - Scoped CSS for modular styling.

## Getting Started

To get a copy of this project up and running on your local machine, follow these steps:

1. Clone this repository:

    ```bash
    git clone https://github.com/az58740/nextjs-multilingual-front.git
    ```

2. Navigate to the project directory:

    ```bash
    cd nextjs-multilingual-front
    ```

3. Install the dependencies:

    ```bash
    npm install
    ```

4. Start the development server:

    ```bash
    npm run dev
    ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser to see your app in action.

## Project Structure


## Usage

To use the app, navigate through the available routes. You can add more routes and components to enhance the app's functionality. Paraglide-Next helps you manage the available languages['en','fa','ar'] and localizations efficiently. 

## Localization

### Adding Languages

To add more languages, update the localization files in the `project.inlang`  and 'messages' . You can follow the structure provided and include translations for each supported language.

### Switching Languages

I implement a language switcher component to allow users to toggle between different languages. The Paraglide-Next documentation provides guidelines on how to set this up effectively.

## Contributing

Contributions are welcome! If you have suggestions or improvements, feel free to fork the repository and submit a pull request.

1. Fork the repository
2. Create a new feature branch
3. Make your changes
4. Commit your changes
5. Push to the branch
6. Open a pull request

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.

---

Thank you for your interest in this project! If you have any questions or need further assistance, please feel free to reach out.