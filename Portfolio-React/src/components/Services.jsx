import React from 'react'
import web_icon from '../assets/web-icon.png'
import mobile_icon from '../assets/mobile-icon.png'
import ui_icon from '../assets/ui-icon.png'
import graphics_icon from '../assets/graphics-icon.png'
import right_arrow from '../assets/right-arrow.png'
import demo from '../assets/demo.jpeg'
import docs from '../assets/docs.jpeg'
import api from '../assets/api.png'
import utils from '../assets/utils.jpeg'

const Services = () => {
  return (
    <div id="services" className="w-full px-[12%] py-10 scroll-mt-20">
    <h2 className="text-center text-5xl font-Ovo">My Experience</h2>
    
    <div className="grid grid-cols-auto gap-6 my-10">
        <div className="border border-gray-400 rounded-lg px-8 py-12
        hover:shadow-black cursor-pointer hover:bg-lightHover hover:-translate-y-1 duration-500 dark:hover:bg-darkHover dark:hover:shadow-white">
            <img src={demo} alt="" className="w-10"/>
            <h3 className="text-lg my-4 text-gray-700 dark:text-white">Master Demo System</h3>
            <p className="text-sm text-gray-600 leading-5 dark:text-white/80">Developed and maintained the Master Demo System, a centralized web portal used by the Presales Team to conduct client demos efficiently.</p>
            
        </div>
        <div className="border border-gray-400 rounded-lg px-8 py-12
        hover:shadow-black cursor-pointer hover:bg-lightHover hover:-translate-y-1 duration-500 dark:hover:bg-darkHover dark:hover:shadow-white">
            <img src={docs} alt="" className="w-10"/>
            <h3 className="text-lg my-4 text-gray-700 dark:text-white">Docs Site</h3>
            <p className="text-sm text-gray-600 leading-5 dark:text-white/80">Worked on the Temenos Docs website — a centralized platform for hosting and managing Temenos product documentation</p>
            
        </div>
        <div className="border border-gray-400 rounded-lg px-8 py-12
        hover:shadow-black cursor-pointer hover:bg-lightHover hover:-translate-y-1 duration-500 dark:hover:bg-darkHover dark:hover:shadow-white">
            <img src={api} alt="" className="w-10"/>
            <h3 className="text-lg my-4 text-gray-700 dark:text-white">API Details</h3>
            <p className="text-sm text-gray-600 leading-5 dark:text-white/80">Created an automation tool in Python to extract API details from war files and output them in
            Excel format.</p>
            
        </div>
        <div className="border border-gray-400 rounded-lg px-8 py-12
        hover:shadow-black cursor-pointer hover:bg-lightHover hover:-translate-y-1 duration-500 dark:hover:bg-darkHover dark:hover:shadow-white">
            <img src={utils} alt="" className="w-10"/>
            <h3 className="text-lg my-4 text-gray-700 dark:text-white">Utilities Docs</h3>
            <p className="text-sm text-gray-600 leading-5 dark:text-white/80">Designed and developed a web-based documentation platform for internal automation tools, enabling users to easily access "how-to-use" guides and technical references.</p>
            
        </div>
    </div>
  </div>
  )
}

export default Services
