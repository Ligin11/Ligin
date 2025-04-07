import React from 'react'
import send_icon from '../assets/send-icon.png'
import right_arrow_blod from '../assets/right-arrow-bold.png'
import right_arrow_blod_dark from '../assets/right-arrow-bold-dark.png'

const Work = () => {
  return (
    <div id="work" className="w-full px-[12%] py-10 scroll-mt-20">
    <h4 className="text-center mb-2 text-lg font-Ovo">My portfolio</h4>
    <h2 className="text-center text-5xl font-Ovo">My latest work</h2>
    <p className="text-center max-w-2xl mx-auto mt-5 mb-12 font-Ovo">Welcome to my web development portfolio! Explore a collection of projects showcasing my expertise in full stack development.</p>

    <div className="grid grid-cols-auto my-10 gap-5 dark:text-black">
        <div className="aspect-square bg-[url('./assets/work-1.jpeg')] bg-no-repeat bg-cover bg-center rounded-lg relative cursor-pointer group">

            <div className="bg-white w-10/12 rounded-md absolute bottom-5 left-1/2 -translate-x-1/2 py-3 px-5 flex items-center justify-between duration-500 group-hover:bottom-7">
                <div>
                    <h2 className="font-semibold">Car Rental System</h2>
                    
                </div>
                <div className="border rounded-full border-black w-9 aspect-square flex items-center justify-center shadow-[2px_2px_0_#000] group-hover:bg-lime-300 transition">
                    
                    <a href='https://carrentalguvi.netlify.app/' target='_blank'>
                    <img src={send_icon} alt="" className="w-5"/>
                    </a>
                </div>
            </div>
        </div>
        <div className="aspect-square bg-[url('./assets/work-2.png')] bg-no-repeat bg-cover bg-center rounded-lg relative cursor-pointer group">

            <div className="bg-white w-10/12 rounded-md absolute bottom-5 left-1/2 -translate-x-1/2 py-3 px-5 flex items-center justify-between duration-500 group-hover:bottom-7">
                <div>
                    <h2 className="font-semibold">Job Portal</h2>
                    
                </div>
                <div className="border rounded-full border-black w-9 aspect-square flex items-center justify-center shadow-[2px_2px_0_#000] group-hover:bg-lime-300 transition">
                    <a href='https://job-portal-client-blush.vercel.app/' target='_blank'>
                    <img src={send_icon} alt="" className="w-5"/>
                    </a>
                </div>
            </div>
        </div>
        <div className="aspect-square bg-[url('./assets/work-3.jpeg')] bg-no-repeat bg-cover bg-center rounded-lg relative cursor-pointer group">

            <div className="bg-white w-10/12 rounded-md absolute bottom-5 left-1/2 -translate-x-1/2 py-3 px-5 flex items-center justify-between duration-500 group-hover:bottom-7">
                <div>
                    <h2 className="font-semibold">Chat App</h2>
                    
                </div>
                <div className="border rounded-full border-black w-9 aspect-square flex items-center justify-center shadow-[2px_2px_0_#000] group-hover:bg-lime-300 transition">
                    <a href='https://full-chat-app-server.onrender.com/' target='_blank'>
                    <img src={send_icon} alt="" className="w-5"/>
                    </a>
                </div>
            </div>
        </div>
        <div className="aspect-square bg-[url('./assets/work-4.jpeg')] bg-no-repeat bg-cover bg-center rounded-lg relative cursor-pointer group">

            <div className="bg-white w-10/12 rounded-md absolute bottom-5 left-1/2 -translate-x-1/2 py-3 px-5 flex items-center justify-between duration-500 group-hover:bottom-7">
                <div>
                    <h2 className="font-semibold">Backgound Remover</h2>
                    
                </div>
                <div className="border rounded-full border-black w-9 aspect-square flex items-center justify-center shadow-[2px_2px_0_#000] group-hover:bg-lime-300 transition">
                    <a href="https://bg-removal-client-indol.vercel.app/" target = '_blank'>

                    <img src={send_icon} alt="" className="w-5"/>
                    </a>
                </div>
            </div>
        </div>
    </div>
 

</div>
  )
}

export default Work
