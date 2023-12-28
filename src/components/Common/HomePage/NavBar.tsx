

function StickyNavbar() {


  return (
    <>
    <nav className="bg-white border-gray-200 dark:bg-gray-900">
      <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl p-4">
        <a href="" className="flex items-center space-x-3 rtl:space-x-reverse">
          <img src="https://res.cloudinary.com/dc3otxw05/image/upload/v1703739138/User%20Image/xnjfl3qswk36lbjfqtny.jpg" className="h-8" alt="Flowbite Logo" />
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">StudyOnline</span>
        </a>
        <div className="flex items-center space-x-6 rtl:space-x-reverse bg-gray-50 dark:bg-gray-700">
         
              <a href="#" className="text-gray-900 dark:text-white hover:underline" aria-current="page">About</a>
              <a href="#" className="text-gray-900 dark:text-white hover:underline">Contact</a>
              <a href="#" className="text-gray-900 dark:text-white hover:underline">More</a>

        </div>
      </div>
    </nav>
    
  </>
  );
}

export default StickyNavbar;
