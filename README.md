# NFT Brand Analytics Dashboard

A modern dashboard for analyzing NFT brand performance, market trends, and contract metrics. Built with React, Vite, and powered by AI insights using Google's Gemini Pro.

## Features

- 📊 Real-time NFT market analytics
- 🎨 Brand performance tracking
- 📈 Interactive charts and metrics
- 🤖 AI-powered market insights
- 📱 Responsive design
- 🌙 Dark mode interface

## Tech Stack

- React + Vite
- Tailwind CSS
- Chart.js
- Google Gemini Pro API
- Axios

## Getting Started

1. Clone the repository:
```bash
git clone <your-repo-url>
cd <your-repo-name>
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
```
Then edit `.env` and add your Google Gemini API key:
```
VITE_GEMINI_API_KEY=your_api_key_here
```

4. Run the development server:
```bash
npm run dev
```

## Deployment on Vercel

1. Push your code to GitHub

2. Visit [Vercel](https://vercel.com) and sign in with GitHub

3. Click "New Project" and import your repository

4. Configure the project:
   - Framework Preset: Vite
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`

5. Add environment variables:
   - Go to Settings > Environment Variables
   - Add `VITE_GEMINI_API_KEY` with your API key

6. Deploy!

## Environment Variables

- `VITE_GEMINI_API_KEY`: Google Gemini Pro API key for AI analysis

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/YourFeature`
3. Commit changes: `git commit -m 'Add YourFeature'`
4. Push to branch: `git push origin feature/YourFeature`
5. Submit a pull request

## License

MIT License - feel free to use this project for your own purposes.

## Acknowledgments

- Built with [React](https://reactjs.org/)
- Powered by [Google Gemini Pro](https://deepmind.google/technologies/gemini/)
- Styled with [Tailwind CSS](https://tailwindcss.com/)
