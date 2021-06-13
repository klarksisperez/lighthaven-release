import bcrypt from 'bcryptjs';
const data = {
    users: [
        {
          //admin
          name: 'lighthaven_admin',
          email: 'lighthaven@admin.com',
          password: bcrypt.hashSync('admin1234', 8),
          image: '/src/custom_avatar.png',
          isAdmin: true,
          isActivated: true,
        },
        {
           //customer
          name: 'Joanna Doe',
          email: 'lighthaven1@user.com',
          password: bcrypt.hashSync('user1234', 8),
          image: '/src/custom_avatar.png',
          isAdmin: false,
          isActivated: true,
        },
        {
            //customer2
           name: 'John Doe',
           email: 'lighthaven2@user.com',
           password: bcrypt.hashSync('user1234', 8),
           image: '/src/custom_avatar.png',
           isAdmin: false,
           isActivated: false,
        },
        {
            //customer3
           name: 'Juan Dela Cruz',
           email: 'lighthaven3@user.com',
           password: bcrypt.hashSync('user1234', 8),
           image: '/src/custom_avatar.png',
           isAdmin: false,
           isActivated: true,
        },

    ],
    
    products:[
        {
            
            title:"Effects of Lorem Ipsum",
            author:"Edward John", /* added */
            genre: 'Research', /* added */
            image: '/src/lorem-ipsum.png',
            textfile: '/src/lorem-ipsum.pdf',
            countInStock:1,
            rating: 0,
            numreview: 0,
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla est purus, ultrices in porttitor in, accumsan non quam."
        },
        {
            
            title:"Pedagogy of Dolor Amet",
            author:"Johnny Doe", /* added */
            genre: 'Research', /* added */
            image: '/src/lorem-ipsum.png',
            textfile: '/src/dolor-amet.pdf',
            countInStock:0,
            rating: 0,
            numreview: 0,
            description: "Nam consectetur porttitor rhoncus. Curabitur eu est et leo feugiat auctor vel quis lorem."
        },
        {
            
            title:"Cause and Effect of Sample",
            author:"Stuart Semple", /* added */
            genre: 'Research', /* added */
            image: '/src/lorem-ipsum.png',
            textfile: '/src/sample.pdf',
            countInStock:0,
            rating: 0,
            numreview: 0,
            description: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo."
        },
        

    ]
}
export default data;