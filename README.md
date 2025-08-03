# CaptionCraft - AI-Powered Social Media Caption Generator

A modern, full-featured web application that helps users generate trendy and engaging social media captions for their photos using AI-powered algorithms.

## Features

- **Image Upload & Camera Capture**: Upload photos or take pictures directly from your device
- **Mood-Based Generation**: Choose from 8 different moods (Happy, Aesthetic, Savage, Travel, etc.)
- **AI Caption Generation**: Get 4-5 personalized captions based on your image and selected mood
- **User Authentication**: Secure login/signup system with session management
- **Responsive Design**: Beautiful, mobile-first design that works on all devices
- **Copy & Save**: One-click copy functionality and save favorites to your profile

## Tech Stack

- **Frontend**: React 18, TypeScript, Tailwind CSS
- **Backend**: Supabase (Authentication, Database)
- **Icons**: Lucide React
- **Build Tool**: Vite

## Getting Started

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd captioncraft
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up Supabase**
   - Create a new project at [supabase.com](https://supabase.com)
   - Copy your project URL and anon key
   - Create a `.env` file based on `.env.example`

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Build for production**
   ```bash
   npm run build
   ```

## Database Schema

The application uses the following Supabase tables:

- `users`: User profiles and authentication
- `captions`: Generated captions and user history
- `favorites`: User's saved favorite captions

## Features in Detail

### Image Handling
- Support for both file upload and camera capture
- Image preview with crop/resize options
- Secure image storage and processing

### AI Caption Generation
- Mood-based caption algorithms
- Context-aware generation based on image analysis
- Multiple caption variations for each request

### User Management
- Email/password authentication
- User profiles and preferences
- Caption history and favorites

### Responsive Design
- Mobile-first approach
- Smooth animations and transitions
- Professional UI/UX design

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support, email support@captioncraft.com or open an issue on GitHub.