# Course Management System

I have developed a frontend form that empowers administrators to create courses. Subsequently, I upload the course videos to Cloudinary and save the video URL, along with the course details, to a MongoDB database. This approach optimizes speed, reduces caching requirements, and minimizes server time by storing only the video URL in a NoSQL database.

To enhance user navigation, I implemented a sidebar containing links to retrieve information about all registered courses. Upon clicking on the details of a specific course, the web application fetches the course details from the MongoDB database. The course video, previously fetched from MongoDB, is then displayed by passing its URL to an HTML5 video tag. This method eliminates the need to fetch the video again from Cloudinary, contributing to a faster and more efficient user experience.

In addition, I incorporated basic CRUD (Create, Read, Update, Delete) operations for managing user notes in the note section. This functionality allows users to create, edit, and delete their notes, contributing to a more interactive and personalized learning environment.

This comprehensive approach ensures an optimized, responsive, and user-friendly web application for administrators, instructors, and learners alike.

# Web Application README

## Design Patterns, Coding Principles, or Standards Used

1. **MVC Architecture:**
   - **Where:** Implemented in the overall structure of the application.
   - **Why:** Facilitates the separation of concerns, promoting modularity and maintainability.

2. **Next OAuth:**
   - **Where:** `/app/api/[...nextauth]/route.js`
   - **Why:** Used for secure user authentication and authorization, ensuring standardized and secure user sessions.

3. **RESTful API Design:**
   - **Where:** Applied to the creation of API endpoints.
   - **Why:** Ensures standardized and scalable communication between the front end and back end, promoting interoperability.

4. **Singleton Pattern:**
   - **Where:** Implemented for database connections.
   - **Why:** Ensures a single, shared instance of the database connection, optimizing resource usage and managing connections effectively.

5. **Cloudinary for Image Upload:**
   - **Where:** Integrated into the image upload functionality.
   - **Why:** Utilized for efficient image storage and management, offering a reliable cloud-based solution for image uploads.

## User Journeys

- **Login:**
  - Users initiate their journey by logging into the web application.

- **Courses Section in Sidebar:**
  - Overview: The sidebar prominently presents a dedicated "Courses" section for easy access.
  - Functionality: Users can effortlessly navigate to the Courses section through the sidebar.

- **Course Listing:**
  - Dynamic Rendering: Upon selecting the "Courses" section, the frontend dynamically generates and displays a list of available courses.
  - User-Friendly Presentation: The course listing is designed for clarity and user-friendliness.

- **Course Details Page:**
  - Triggering Course Details: Clicking on a specific course within the listing initiates the rendering of the detailed course page.
  - Information Retrieval: The frontend actively fetches and displays comprehensive information about the selected course, including video content, study notes, and available quizzes.

## Technologies Used

- **Frontend:** [Next.js](https://nextjs.org/) for building the user interface.
- **Backend:** [Node.js](https://nodejs.org/) for server-side logic.
- **Database:** [MongoDB](https://www.mongodb.com/) for storing course details and user notes.
- **Cloud Service:** [Cloudinary](https://cloudinary.com/) for efficient video and image storage.

## Setup Instructions

1. Clone the repository: `git clone [git@github.com:Abdullahi-design/miva-nextjs.git]`.
2. Navigate to the project directory: `cd miva-nextjs`.
3. Install dependencies: `npm install`.
4. Start the application: `npm run dev`.
