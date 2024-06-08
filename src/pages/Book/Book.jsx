
import { useEffect, useState } from 'react';
import toKill_A_Mockingbird from '../../assets/tokill_a_mokingbird_cover.jpg';
import cover_1984 from '../../assets/1984_cover.jpg';
import Great_Gatsby_Cover from '../../assets/great_gatsby_cover.jpg';
import Moby_Dick from '../../assets/moby_dick_cover.jpg';
import Pride_and_Prejudice from '../../assets/pride_prejudice.jpg';
import The_Catcher_Rye from '../../assets/the_catcher_rye.jpg';
import Brave_New_World from '../../assets/brave_new_world.jpg';
import The_Hobbit from '../../assets/the_hobbit.jpg';
import { FaSearch } from 'react-icons/fa';
import axios from 'axios';
const Book = () => {
  const booksData = [
    {
      id: 1,
      title: 'To Kill a Mockingbird',
      author: 'Harper Lee',
      description: 'A gripping, heart-wrenching, and wholly remarkable tale of coming-of-age in a South poisoned by virulent prejudice.',
      pages: 281,
      image: toKill_A_Mockingbird,
      rating: 4.5
    },
    {
      id: 2,
      title: '1984',
      author: 'George Orwell',
      description: 'A dystopian social science fiction novel and cautionary tale written by the English writer George Orwell.',
      pages: 328,
      image: cover_1984,
      rating: 4.7
    },
    {
      id: 3,
      title: 'The Great Gatsby',
      author: 'F. Scott Fitzgerald',
      description: 'The story of eccentric millionaire Jay Gatsby as told by Nick Carraway, a Midwesterner who lives on Long Island but works in Manhattan.',
      pages: 180,
      image: Great_Gatsby_Cover,
      rating: 4.3
    },
    {
      id: 4,
      title: 'Moby Dick',
      author: 'Herman Melville',
      description: 'The story tells the adventures of wandering sailor Ishmael, and his voyage on the whaleship Pequod, commanded by Captain Ahab.',
      pages: 720,
      image: Moby_Dick,
      rating: 4.0
    },
    {
      id: 5,
      title: 'Pride and Prejudice',
      author: 'Jane Austen',
      description: 'Follows the character development of Elizabeth Bennet, who learns the error of making hasty judgments and comes to appreciate the difference between the superficial and the essential.',
      pages: 432,
      image: Pride_and_Prejudice,
      rating: 4.6
    },
    {
      id: 6,
      title: 'The Catcher in the Rye',
      author: 'J.D. Salinger',
      description: 'A story by J. D. Salinger, partially published in serial form in 1945–1946 and as a novel in 1951.',
      pages: 214,
      image: The_Catcher_Rye,
      rating: 4.2
    },
    {
      id: 7,
      title: 'Brave New World',
      author: 'Aldous Huxley',
      description: 'A dystopian social science fiction novel by English author Aldous Huxley, written in 1931 and published in 1932.',
      pages: 288,
      image: Brave_New_World,
      rating: 4.1
    },
    {
      id: 8,
      title: 'The Hobbit',
      author: 'J.R.R. Tolkien',
      description: 'The tale of Bilbo Baggins, a hobbit who embarks on an adventure to recover a treasure guarded by a dragon.',
      pages: 322,
      image: The_Hobbit,
      rating: 4.8
    }
  ];

  const [books, setBooks] = useState([]);

  // useEffect(() => {
  //   setBooks(booksData);
  // }, []);

  // const renderStars = (rating) => {
  //   const fullStars = Math.floor(rating);
  //   const halfStar = rating % 1 !== 0;
  //   const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);
  //   return (
  //     <div className='flex'>
  //       {'★'.repeat(fullStars)}
  //       {halfStar && '☆'}
  //       {'☆'.repeat(emptyStars)}
  //     </div>
  //   );
  // };

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get('http://localhost:9000/books');
        console.log('Fetched books:', response);
        if (Array.isArray(response.data.Data)) {
          setBooks(response.data.Data);
        }
        else {
          throw new Error('Unexpected data format');
        }
        console.log(books)
      } catch (error) {
        console.error('Error fetching books:', error);
      }
    };

    fetchBooks();
  }, []);
  return (
    <div className='grid grid-cols-4 gap-20 container mb-8'>
        <div className='bg-primary h-[40rem] ml-0'>Side Left </div>
        <div className='col-span-2'>
        <div className=' bg-transparent mt-20 relative'>
            <input
              type="search"
              name="search"
              id="search"
              placeholder='Search '
              className='border border-gray-200 rounded-full w-full p-3 pl-4 pr-10 bg-secondary/30'
            />
            <FaSearch className="absolute top-1/2 transform -translate-y-1/2 right-3 text-gray-400" />
          </div>
          <div className='book-content bg-tarnsparent border border-gray-300 rounded-md  my-10 h-auto'>
          <h3 className='text-gray-700 text-end p-4 hover:text-primary cursor-pointer'>All Books</h3>
            <div className='grid grid-cols-3 '>
             
             {/* {books.length > 0 ? (
              books.map((book) => (
                <div key={book.id} className='border border-gray-200 rounded-md p-2 m-4 text-center flex flex-col justify-center items-center '>
                  <img src={book.image} alt={book.title} className='w-full h-40 object-cover mb-3 cursor-pointer' />
                  <h1 className='text-lg font-semibold'>{book.title}</h1>
                  <p className='text-md text-gray-900 font-medium'>{book.author}</p>
                  
                  <p className='text-sm text-gray-500'>Pages: {book.pages}</p>
                  <div className='text-yellow-500'>{renderStars(book.rating)}</div>
                  <button className='px-6 py-1 rounded-sm outline mt-4 outline-primary text-primary hover:bg-primary hover:text-secondary flex justify-center items-center text-center'>Details</button>
                </div>
              ))
            ) : (
              <div>No books available</div>
            )}  */}
            {Array.isArray(books) && books.length > 0 ? ( 
              books.map(book => (
                <div key={book._id}  className='border border-gray-200 rounded-md p-3 m-4 '>
                 <img src={`http://localhost:9000/bookImage/${book.cover}`} alt="BookImage" />
                {console.log(`http://localhost:9000/bookImage/${book.cover}`)} 
                  <h2>{book.title}</h2>
                  <p>{book.author}</p>
                  <p>{book.description}</p>
                </div>
              ))
            ) : (
              <div>No books available</div>
            )}
            </div>
          </div>
        </div>
        <div className='bg-tarnsparent border border-gray-300 rounded-md mt-20'>Side Right</div>

    </div>
  )
}

export default Book 