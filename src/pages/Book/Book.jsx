
import { useEffect, useState } from 'react';

import { FaSearch } from 'react-icons/fa';
import axios from 'axios';
const Book = () => {
  

  

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


  const [books, setBooks] = useState([]);
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
                <img 
                    src={`http://localhost:9000/image/${book.cover}`} 
                    alt={book.title} 
                    className='w-full h-40 object-cover mb-3 cursor-pointer' 
               
                  />
                {console.log(`http://localhost:9000/image/${book.cover}`)} 
                  <h2>{book.title}</h2>
                  <p>{book.author}</p>
                  
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