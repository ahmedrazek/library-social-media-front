// import React from 'react';
// import NoResult from '../../assets/Laptop-01.png';
// import { Link } from 'react-router-dom';

// export default function Noresult() {
//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen p-4">
//       <img src={NoResult} alt="No Result Found" className="mb-6" />
//       <h2 className="text-2xl font-bold mb-4 text-primary">No Result Found!</h2>
//       <p className="text-center mb-6">
//         Sorry, we came up empty-handed. Let's broaden our search and help you find what you're looking for.
//       </p>
//       <Link to="/user/books">
//         <button className="bg-primary text-white font-bold py-2 px-4 rounded hover:bg-white hover:text-primary border border-primary transition-colors">
//           Search Again
//         </button>
//       </Link>
//     </div>
//   );
// }

import React from 'react';
import NoResultImage from '../../assets/Laptop-01.png';

export default function Noresult({ resetSearch }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 col-span-3">
      <img src={NoResultImage} alt="No Result Found" className="mb-6" />
      <h2 className="text-2xl font-bold mb-4 text-primary">No Result Found!</h2>
      <p className="text-center mb-6">
        Sorry, we came up empty-handed. Let's broaden our search and help you find what you're looking for.
      </p>
      <button
        onClick={resetSearch}
        className="bg-primary text-white font-bold py-2 px-4 rounded hover:bg-white hover:text-primary border border-primary transition-colors"
      >
        Search Again
      </button>
    </div>
  );
}

