import React from 'react'
import { Link } from 'react-router-dom'
import { templatesData } from '../../utils/data/templates'

const TemplateBundle = ({category}) => {

    const bundleObj = {
        "Affiliate Marketing": {
            color: "linear-gradient(91.12deg, #F9655B 0.01%, #EE821A 99.87%)",
            desc: "Grow your affiliate business with comparison guides, reviews, and more."
        },
        "Product Marketing":{
            color: "linear-gradient(91.12deg, #872256 0.01%, #F4119E 99.87%)",
            desc: "Enhance your brand identity with copy and social media content."
        },
        "Email Marketing":{
            color:"linear-gradient(91.12deg, #189034 0.01%, #00FF4C 99.87%)",
            desc: "A suite of pre-made emails to entice and convert your customers."
        },
        "Social Media Marketing":{
            color: "linear-gradient(91.09deg, #210CAE 0.01%, #0F9CBD 100%)",
            desc: "Boost your online presence with engaging posts, hashtags, and campaigns tailored to your audience."
        },
        "Content Writing":{
            color: "linear-gradient(91.12deg, #228782 0.01%, #43C197 99.87%)",
            desc: "Craft compelling long-form articles, and short blogs that capture attention and drive engagement."
        },
        "Digital Marketing":{
            color: "linear-gradient(91.12deg, #33104C 0.01%, #C31432 99.87%)",
            desc: "Leverage targeted ad copy, landing pages, and strategic content to maximize your digital outreach and ROI."
        },
        "SEO":{
            color: "linear-gradient(91.12deg, #33104C 0.01%, #C31432 99.87%)",
            desc: "Optimize your website with keyword-rich content to rank higher in search engines and attract organic traffic."
        }
    }

    const getCountOfTemplates = () => {
        const temp = templatesData.filter((v) => {
            return v.category.includes(category)
        })
        return temp.length
    }

 

  return (
    <Link to={`/category/${category}`}
    state={{category}}
    >
        <div style={{background: bundleObj[category]?.color}} 
        className="cursor-pointer rounded-md p-6 py-8 w-[230px] h-[240px] space-y-5 text-white">
            <h2 >{getCountOfTemplates() >= 10 ? "10+" : getCountOfTemplates()}</h2>
            <p className='text-[15px] font-semibold '>{category}</p>
            <p className='text-[12px]'>
            {bundleObj[category]?.desc}
            </p>
        </div>
    </Link>
  )
}

export default TemplateBundle