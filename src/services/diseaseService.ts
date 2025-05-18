
import { v4 as uuidv4 } from 'uuid';
import { DiseaseResult } from '@/components/ImageUploader';

// This is a mock service that simulates AI disease detection
export async function detectDisease(imageFile: File): Promise<DiseaseResult> {
  // In a real app, we would send the image to a backend API
  // Here we're simulating a delay and returning mock data
  return new Promise((resolve) => {
    setTimeout(() => {
      // Mock diseases with symptoms, treatments and videos
      const diseases = [
        {
          diseaseName: "Tomato Late Blight",
          probability: 0.92,
          symptoms: "Dark brown spots on leaves that grow rapidly, white fungal growth on leaf undersides, rotting fruit.",
          treatment: "Remove infected plants, apply copper-based fungicide, ensure proper spacing and ventilation.",
          videoId: "ojfK0iS0ZgI" // Tomato disease video
        },
        {
          diseaseName: "Apple Scab",
          probability: 0.87,
          symptoms: "Olive-green to brown spots on leaves and fruit, cracking of fruit skin, premature fruit drop.",
          treatment: "Apply fungicides at green tip stage, practice good sanitation by removing fallen leaves.",
          videoId: "4GYpcXncLCg" // Apple disease video
        },
        {
          diseaseName: "Grape Black Rot",
          probability: 0.89,
          symptoms: "Small brown circular lesions on leaves, black circular lesions on fruit with concentric rings.",
          treatment: "Apply proper fungicide, improve air circulation by pruning, remove mummified fruit.",
          videoId: "-p7uPWqWgbw" // Grape disease video
        },
        {
          diseaseName: "Potato Early Blight",
          probability: 0.91,
          symptoms: "Dark, concentric rings on lower leaves, yellowing around spots, premature leaf drop.",
          treatment: "Remove infected leaves, apply organic fungicide, mulch soil to prevent spore splash.",
          videoId: "XZFacRsCi9M" // Potato disease video
        },
        {
          diseaseName: "Corn Common Rust",
          probability: 0.88,
          symptoms: "Small, reddish-brown pustules on both leaf surfaces, severe infections cause leaf yellowing and death.",
          treatment: "Use resistant corn varieties, apply fungicides when disease first appears, rotate crops.",
          videoId: "LKphf5ABF30" // Corn disease video
        },
        {
          diseaseName: "Bell Pepper Bacterial Spot",
          probability: 0.86,
          symptoms: "Small, water-soaked spots that enlarge and turn dark brown, fruit spots are raised with cracked centers.",
          treatment: "Use disease-free seeds, rotate crops, apply copper-based bactericides early.",
          videoId: "4MKI4gvZFHg" // Pepper disease video
        },
        {
          diseaseName: "Strawberry Leaf Scorch",
          probability: 0.90,
          symptoms: "Purple to red spots on leaves that enlarge to cover entire leaflet, leaf edges turn brown and dry.",
          treatment: "Remove infected leaves, ensure proper plant spacing, avoid overhead irrigation.",
          videoId: "yzKg1CvYEIg" // Strawberry disease video
        },
        {
          diseaseName: "Citrus Greening",
          probability: 0.93,
          symptoms: "Yellowing of leaf veins and shoots, lopsided bitter fruit, leaf mottle, premature fruit drop.",
          treatment: "Remove infected trees, control psyllid vectors, apply nutritional sprays.",
          videoId: "o4BC6hoKrb0" // Citrus disease video
        },
        {
          diseaseName: "Rice Blast",
          probability: 0.94,
          symptoms: "Diamond-shaped lesions on leaves with gray centers, infected panicles break at lesions.",
          treatment: "Use resistant varieties, apply fungicide at early heading stage, manage nitrogen fertilization.",
          videoId: "-KjD6_Rg20c" // Rice disease video
        }
      ];
      
      // Randomly select a disease
      const randomIndex = Math.floor(Math.random() * diseases.length);
      const disease = diseases[randomIndex];
      
      resolve({
        id: uuidv4(),
        ...disease
      });
    }, 2000); // Simulate a 2 second processing time
  });
}
