
# tg-mini-app 🚀

## ✨ Features

*   **Dynamic Event Management**: Browse, view, and interact with various events.
*   **User Accounts**: Manage user profiles and related information.
*   **Responsive Design**: Optimized for a seamless experience across different devices.
*   **Efficient Data Fetching**: Utilizes React Query for robust caching and background updates.
*   **State Management**: Employs MobX for predictable and observable state management.
*   **Styling**: Leverages Emotion for powerful CSS-in-JS styling capabilities.
*   **Routing**: Implements client-side routing for smooth navigation with `react-router-dom`.
*   **Code Quality**: Enforces code consistency with ESLint and TypeScript.

## 🛠️ Tech Stack

*   **Frontend Framework**: React
*   **Language**: TypeScript, JavaScript
*   **Build Tool**: Vite
*   **State Management**: MobX, MobX React Lite
*   **Data Fetching & Caching**: React Query (`@tanstack/react-query`)
*   **Styling**: Emotion (`@emotion/react`, `@emotion/styled`)
*   **HTTP Client**: Axios
*   **Routing**: React Router DOM (`react-router-dom`)
*   **Linting**: ESLint
*   **Development Server**: Vite plugins (`@vitejs/plugin-react-swc`, `@vitejs/plugin-basic-ssl`)
*   **Deployment**: gh-pages

## 🚀 Installation

To get started with the-point-of-growth, follow these steps:

1.  **Clone the repository**:
    ```bash
    git clone https://github.com/your-username/the-point-of-growth.git
    cd the-point-of-growth
    ```

2.  **Install dependencies**:
    This project uses both `npm` and `pnpm`. It's recommended to use `pnpm` for faster and more efficient dependency management.

    **Using pnpm (Recommended)**:
    ```bash
    pnpm install
    ```

    **Using npm**:
    ```bash
    npm install
    ```
    *Note: If `pnpm` is not installed, you can install it globally via `npm install -g pnpm`.*

## 💡 Usage

Once dependencies are installed, you can run the development server:

1.  **Start the development server**:
    ```bash
    pnpm dev
    # or
    npm run dev
    ```

    This will start the Vite development server. The application will be accessible at `http://localhost:5173` (or the port specified by Vite) with hot module replacement enabled.

    The `vite.config.ts` file includes a proxy configuration for development:
    ```javascript
    server: {
      proxy: {
        "/api": {
          target: "http://62c8d468f852.vps.myjino.ru:49196",
          changeOrigin: true,
          secure: false,
        },
      },
    },
    ```
    This means requests starting with `/api` will be proxied to the specified backend server during development.

2.  **Build for production**:
    To create an optimized build of the application for deployment:
    ```bash
    pnpm build
    # or
    npm run build
    ```
    This command will generate the static assets in the `dist` directory.

3.  **Deploy to GitHub Pages**:
    The project is configured to deploy to GitHub Pages using `gh-pages`.
    ```bash
    pnpm deploy
    # or
    npm run deploy
    ```

## 📂 Project Structure

The project follows a structured directory layout:

```
.
├── public/             # Static assets (e.g., favicon, images)
│   └── vite.svg
├── src/                # Application source code
│   ├── axios/          # Axios configurations and request logic
│   ├── components/     # Reusable UI components
│   ├── hooks/          # Custom React hooks
│   ├── icon/           # SVG icon components
│   ├── img/            # Image assets
│   ├── index.css       # Global CSS styles
│   ├── main.tsx        # Application entry point
│   ├── pages/          # Page-level components
│   ├── providers/      # React context providers
│   ├── router/         # Application routing configuration
│   ├── store/          # MobX stores
│   ├── styles/         # Shared styling utilities or themes
│   ├── types/          # TypeScript type definitions
│   ├── utils/          # Utility functions
│   └── App.tsx         # Root React component
├── eslint.config.js    # ESLint configuration
├── index.html          # Main HTML entry file
├── package-lock.json   # npm dependency lock file
├── package.json        # Project metadata and dependencies
├── tsconfig.app.json   # TypeScript configuration for the application
├── tsconfig.json       # Base TypeScript configuration
├── tsconfig.node.json  # TypeScript configuration for Node.js environment
├── vercel.json         # Vercel deployment configuration (if applicable)
└── vite.config.ts      # Vite build tool configuration
```

## ⚙️ Configuration

### Environment Variables

This project may utilize environment variables for configuration. Ensure you have a `.env` file in the root of your project if needed, or consult specific deployment platform documentation for setting environment variables.

The `vite.config.ts` demonstrates setting up a proxy for API requests during development, which is a common configuration aspect.

## 🤝 Contributing

We welcome contributions to the-point-of-growth! If you'd like to contribute, please follow these guidelines:

1.  **Fork the repository.**
2.  **Create a new branch** for your feature or bug fix.
3.  **Make your changes** and ensure they adhere to the project's coding standards (enforced by ESLint).
4.  **Write tests** for your changes if applicable.
5.  **Commit your changes** with clear and descriptive messages.
6.  **Submit a Pull Request.**

Please ensure your code is well-formatted and passes all linting checks.

## 📜 License

This project is licensed under the [MIT License](LICENSE).
