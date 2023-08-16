# TutorPotential 
TutorPotential is a comprehensive MERN (MongoDB, Express.js, React.js, Node.js) application designed to bridge the gap between students in need of personalized tutoring and competent tutors who can cater to specific learning requirements. The platform also provides functionalities for tutoring companies to manage and oversee the profiles of both tutors and students.

![Screenshot 2023-08-16 at 5 12 56 AM](https://media.git.generalassemb.ly/user/49294/files/44231d8d-68d7-4d6e-8fd0-20b92d0c8b3a)

# Technologies Used

The following technologies were utilized in the development of **TutorPotential**:

- **MongoDB:** Our app's backbone is built on MongoDB, a robust NoSQL database that efficiently stores and manages all fighter details, ensuring lightning-fast performance and flexible schema design.

- **Express.js:** A minimalistic and fast web application framework for Node.js, Express.js provides SmashLabs with the capabilities to handle routes, API creation, and server-side functionalities with ease.

- **React.js:** This front-end JavaScript library empowers SmashLabs with the ability to create a dynamic, interactive, and user-friendly interface. React's component-based architecture allows for efficient data rendering and state management.

- **JWT (JSON Web Tokens):** JWT is used in SmashLabs for securely transmitting information between parties as a JSON object. It's pivotal for authentication and authorization, ensuring that users are who they claim to be and granting them access only to what they should see.

- **React-toastify:** Provides SmashLabs with customizable notifications. Whether it's error messages, success messages, or informational pop-ups, React-toastify enhances user feedback mechanisms in an intuitive and stylish manner.

- **bcrypt:** Security is a top priority in SmashLabs. bcrypt is employed for hashing passwords, ensuring user passwords stored in the database are encrypted and secure against potential breaches.

- **TailwindCSS:** A utility-first CSS framework, TailwindCSS is leveraged in SmashLabs to create fast-loading, responsive designs with ease. Its modular approach allows for rapid UI development without bloated code.

- **Bootstrap:** An open-source CSS framework, Bootstrap aids in designing responsive and mobile-first projects. In SmashLabs, it complements TailwindCSS by providing additional styling options and components.

- **Visual Studio Code:** Our developers rely on the powerful Integrated Development Environment (IDE), Visual Studio Code, to craft clean and efficient code, ensuring the app runs smoothly.

- **Heroku:** For seamless deployment and hosting of the app, SmashLabs leverages Heroku, a trusted cloud platform, guaranteeing that users can access the app anytime, anywhere.



# Installation Instructions

<ol>
<li>Clone the repository by running:
<pre><code>git clone https://github.com/omer-abdul-hameed/TutorPotential.git</code></pre>
</li>
<li>Navigate to the project directory:
<pre><code>cd TutorPotential </code></pre>
</li>
<li>Install all dependencies:
<pre><code>npm i
</code></pre>
</li>
<li>Run Frontend:
<pre><code>npm run frontend</code></pre>
</li>
<li>Open second terminal and run Backend simultaneously
<pre><code>npm run backend</code></pre>
</li>
<li>Visit <a href="http://localhost:5173">http://localhost:5173</a> to access the application locally.</li>

<li>Visit <a href="https://smashlabs-69ccb3a7e5a4.herokuapp.com/"> Live Site</a> Instead !</li>
</ol>

## User Stories

1. **Student User Story**
   - As a student, I want to be able to search for tutors based on my location and subject requirements, so that I can find the most suitable tutor for my learning needs.

2. **Tutor User Story**
   - As a tutor, I want to be able to update my profile with my areas of expertise, rates, and general area of operation, so that potential students can find me based on their specific needs.

3. **Tutoring Company User Story**
   - As a tutoring company, I want to be able to manage the profiles of both students and tutors, so that I can ensure the quality of the service and facilitate effective matches between students and tutors.



# Major Hurdles:

1. **Frontend CRUD:** Establishing the frontend CRUD operations posed a significant challenge due to various underlying issues.

2. **CORS Issues:** We faced multiple Cross-Origin Resource Sharing (CORS) issues, which required resolution to ensure smooth data exchange between origins.

3. **Authorization Headers:** Implementing authorization headers for secure API requests was an intricate task that demanded attention and resolution.





# Unsolved Problems:

1. **Filter Method:** We couldn't successfully implement a filter method to enhance the card display based on subjects.

2. **Google OAuth:** Our efforts to incorporate Google OAuth for authentication did not materialize.

3. **Google Maps API:** Due to time constraints, we were unable to integrate the Google Maps API. However, we plan to add this feature in future updates.




# ERD

![Screenshot 2023-08-04 at 6 38 15 PM](https://media.git.generalassemb.ly/user/49294/files/ca2bc4bf-ea0e-418a-b60f-20b758162133)

## Wire Frames
![IMG_0013](https://media.git.generalassemb.ly/user/49294/files/097a7546-59b2-49d5-b201-7dbf78ae47bb)
![IMG_0010](https://media.git.generalassemb.ly/user/49294/files/9a5d608f-e78b-4ee1-91bf-3ed576401dc4)
![IMG_0011](https://media.git.generalassemb.ly/user/49294/files/10be625e-8f02-4d7c-a7e6-fb63fa76a30d)
![IMG_0012](https://media.git.generalassemb.ly/user/49294/files/f0e25622-736b-4dcc-989d-bb548862b1bc)