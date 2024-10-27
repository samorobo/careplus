# Next.js 14 CarePulse

![Latest Release](https://img.shields.io/github/v/release/ladunjexa/nextjs14-carepulse)
![Stars](https://img.shields.io/github/stars/ladunjexa/nextjs14-carepulse)
![Forks](https://img.shields.io/github/forks/ladunjexa/nextjs14-carepulse)
![GitHub Commits](https://img.shields.io/github/commits-since/ladunjexa/nextjs14-carepulse/latest)
![Pull Requests](https://img.shields.io/github/issues-pr/ladunjexa/nextjs14-carepulse)
![Known Vulnerabilities](https://snyk.io/test/github/ladunjexa/nextjs14-carepulse/badge.svg)

![Project Logo](/public/assets/images/carepulse_screenshot)
## 🌐 Live Demo
Explore the live demonstration of the project: [nextjs14-carepulse](#)

## 📝 Description
**CarePulse** is a healthcare management application that allows patients to schedule appointments and doctors to manage appointments and patient records, dates and decision of  appointment gets communicated to patient via an SMS. Its also offers an AI assisted chatBot that can respond to patient about health issues questions, and offer them useful tips to stay healthy Built with **Next.js**, **Tailwind CSS**, **Shadcn UI**, **Appwrite**, **Twilio**, **LLama3** and **Sentry**.

## 📖 Table of Contents
1. [Technologies Used](#technologies-used)
2. [Get Started](#get-started)
3. [Installation and Run Locally](#installation-and-run-locally)
4. [Scripts](#scripts)
5. [Environment Variables](#environment-variables)
6. [Deployment](#deployment)
7. [Contributing](#contributing)
8. [Bug / Feature Request](#bug--feature-request)
9. [Acknowledgements](#acknowledgements)
10. [Contact Us](#contact-us)
11. [License](#license)

## ✨ Technologies Used
CarePulse is built using:
- Next.js
- Tailwind CSS
- Shadcn UI
- Appwrite
- Twilio
- LLama3
- Sentry

## 🧰 Get Started
To set up the project in your development environment, follow these steps:

### 📋 Prerequisites
Ensure you have these installed:
- **Node.js**
- **NPM**
- **Git**

## ⚙️ Installation and Run Locally
1. **Important**: CarePulse uses Appwrite, Sentry,  and Twilio services. Set up accounts and add the required credentials in a `.env` file:
    - Appwrite: `APPWRITE_PROJECT_ID`, `APPWRITE_PUBLIC_ENDPOINT`, `APPWRITE_API_KEY`, `APPWRITE_DATABASE_ID`, `APPWRITE_BUCKET_ID`, `PATIENT_COLLECTION_ID`,  `APPOINTMENT_COLLECTION_ID`, `DOCTOR_COLLECTION_ID`,  
    - Sentry: `SENTRY_AUTH_TOKEN`
    - Twilio: `TWILIO_ACCOUNT_SID`, `TWILIO_AUTH_TOKEN`, `TWILIO_PHONE_NUMBER`
    - GROQ: `GROQ_API_KEY`
2. **Clone Repository**:
    ```bash
    git clone https://github.com/samorobo/careplus.git
    ```
3. **Install Dependencies**:
    ```bash
    npm install
    ```
4. **Run Development Server**:
    ```bash
    npm run dev
    ```
5. **Open**: Visit [http://localhost:3000](http://localhost:3000) in your browser.

## 📜 Scripts
| Script           | Action                                       |
|------------------|----------------------------------------------|
| `npm install`    | Installs dependencies                        |
| `npm run dev`    | Starts local dev server at `localhost:3000`  |
| `npm run build`  | Builds production-ready code                 |
| `npm run start`  | Starts production server                     |
| `npm run lint`   | Runs ESLint                                  |

## 🔒 Environment Variables
Add the following environment variables in your `.env.local` file:
```plaintext
NEXT_PUBLIC_ENDPOINT=<NEXT_PUBLIC_ENDPOINT>

PROJECT_ID=<APPWRITE_PROJECT_ID>
NEXT_PUBLIC_ENDPOINT=<APPWRITE_PUBLIC_ENDPOINT>
API_KEY=<APPWRITE_API_KEY>
DATABASE_ID=<APPWRITE_DATABASE_ID>
APPWRITE_BUCKET_ID=<APPWRITE_BUCKET_ID>
APPWRITE_PATIENT_COLLECTION_ID=<APPWRITE_PATIENT_COLLECTION_ID>
APPWRITE_DOCTOR_COLLECTION_ID=<APPWRITE_DOCTOR_COLLECTION_ID>
APPWRITE_APPOINTMENT_COLLECTION_ID=<APPWRITE_APPOINTMENT_COLLECTION_ID>

NEXT_PUBLIC_ADMIN_PASSKEY=<NEXT_PUBLIC_ADMIN_PASSWORD>
SENTRY_AUTH_TOKEN=<SENTRY_AUTH_TOKEN>

TWILIO_ACCOUNT_SID=<TWILIO_ACCOUNT_SID>
TWILIO_AUTH_TOKEN=<TWILIO_AUTH_TOKEN>
TWILIO_PHONE_NUMBER=<TWILIO_PHONE_NUMBER>

GROQ_API_KEY=<GROQ_API_KEY>

```

## 🚀 Deployment

### Deploy to Production (Manual)
You can create an optimized production build with the following command:
```bash
npm run build
```

### Deploy on Vercel (Recommended)
The easiest way to deploy this Next.js app is to use the Vercel Platform.

[Deploy with Vercel](https://vercel.com)

### Deploy on Netlify
You can also deploy this Next.js app with Netlify.

[Deploy with Netlify](https://www.netlify.com)

Check out the Next.js deployment documentation for more details.

## 🔧 Contributing
We welcome contributions to CarePulse! Contributions make open source a great place to learn, inspire, and create. Any contributions you make are greatly appreciated.

To fix a bug or enhance an existing feature:

Fork the repo
Create a new branch: `git checkout -b improve-feature`
Make changes in the files
Commit changes: `git commit -m 'Improve feature`
Push to the branch: `git push origin improve-feature`
Create a Pull Request 🎉

## 📩 Bug / Feature Request
If you find a bug or want to request a feature:

Open an issue with a title and clear description.
For feature requests, please include sample queries and expected results.

## 💎 Acknowledgements
Special thanks to:

- [Next js](https://nextjs.org/)
- [Tailwind css](https://tailwindcss.com/)
- [Shadcn UI](https://ui.shadcn.com/)
- [Appwrite](https://appwrite.io/)
- [Sentry](https://sentry.io/)
- [Twilio](https://www.twilio.com/en-us)
- [React Datepicker](https://www.npmjs.com/package/react-datepicker)
- [Vercel](https://www.vercel.com)
- [Groq](https://groq.com)
- [LLama3](https://www.llama.com)

## 📞 Contact Us
Connect with us on 
- [LinkedIn](https://www.linkedin.com/in/godwin-samuel)
- [instagram](https://www.instagram.com/godwin839/) 

## 📋 License
CarePulse is open-source software licensed under the [MIT LICENSE](https://opensource.org/license/mit) 




