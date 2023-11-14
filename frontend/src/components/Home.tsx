import {AiOutlineCheck} from "react-icons/ai"
import { Link, useNavigate } from "react-router-dom"
const Home = () => {
  const nav=useNavigate();
  return (
<div style={{position:"absolute"}}>
  {/* 1rd row............... */}

    <div className="flex justify-center w-11/12 m-[auto]">
        <div className="w-[46%] flex flex-col text-center mr-[5rem]" style={{alignItems:"center"}}>
            <h2 className="text-3xl text-center w-3/4 mt-[1.6rem] font-bold" ><b style={{color:"rgb(0,168,132)"}}>Intellibot.</b>  End-to-End AI Video Interview Software</h2>
            <h4 className=" text-justify mt-[20px] mb-[20px]" style={{lineHeight:"2"}}>Intellibot is all about efficiency. It’s a state-of-the-art video recruiting software that uses Explainable AI to pre-screen and shortlist candidates, bringing the best talent out there for the role you’re looking for. Our online smart video interview software cuts the time of unnecessary pre-interviews, giving you more time to focus on what’s really important – your company. Our software is powered by top-notch AI hiring technology, analyzing key factors of potential candidates, including psychological and technical aspects.</h4>

            <button type="button" onClick={()=>nav("/dashboard")}  className="startButton p-[15px] m-[12px] w-[25%] font-bold ">GET STARTED</button>
        </div>
        <div style={{width:"40%"}}>
        <img src="https://dev-to-uploads.s3.amazonaws.com/uploads/articles/wbz0ykyhdq716ndr5wy4.jpg" style={{width:"100%",borderRadius:"20px"}} alt="" />
        </div>
    </div>

{/* 2rd row............... */}
    <div className="flex justify-evenly w-11/12 m-[auto] mt-[4rem] ">
    <div  style={{width:"42%"}}>
        <img src="https://dev-to-uploads.s3.amazonaws.com/uploads/articles/gaow9c1w9tz5j37ac3ug.jpg" style={{width:"100%",borderRadius:"20px"}} alt="" />
      </div>

        <div className="w-[46%] text-justify flex flex-col justify-center" >
            <h2 className="text-3xl text-left w-3/4 font-bold" >Interview</h2>
            <h4 className="text-left" style={{marginTop:"15px",marginBottom:"15px", fontSize:"1.3rem"}}>You may know the answer or approach to the question, but expressing it in words swiftly is what makes interviews challenging to face..</h4>

            <div className="interview">
            <div className="tick" >
              <AiOutlineCheck style={{fontSize:"1.3rem"}} /></div>
               <p style={{marginLeft:"2rem",fontSize:"1.3rem"}}>AI driven interviews that feel realistic.</p>
               </div>
            <div className="interview">
            <div className="tick" >
              <AiOutlineCheck style={{fontSize:"1.3rem"}} /></div>
            <p style={{marginLeft:"2rem",fontSize:"1.3rem",textAlign:"left"}}>Take interviews at your convenience, across all devices.</p>
               </div>
            <div className="interview">
            <div className="tick" >
              <AiOutlineCheck style={{fontSize:"1.3rem"}} /></div>
              <p style={{marginLeft:"2rem",fontSize:"1.3rem"}}>Detailed feedback post interview completion.</p>
               </div>
          
        </div>
    </div>


{/* 3rd row............... */}
    <div className="flex justify-center w-11/12 m-[auto] mt-[5rem] mb-[4rem]">
    
        <div className="w-[46%] text-justify flex flex-col justify-center" >
            <h2 className="text-3xl text-left w-3/4 font-bold" >AI Analysed Feedback</h2>
            <h4 className="text-left" style={{marginTop:"15px",marginBottom:"15px", fontSize:"1.3rem"}}>Get detailed interview feedback that provides you insights on your skills and feedback for every question answered.</h4>

            <div className="interview">
            <div className="tick" >
              <AiOutlineCheck style={{fontSize:"1.3rem"}} /></div>
               <p style={{marginLeft:"2rem",fontSize:"1.3rem"}}>AI analysed feedback post interview completion..</p>
               </div>
            <div className="interview">
            <div className="tick" >
              <AiOutlineCheck style={{fontSize:"1.3rem"}} /></div>
            <p style={{marginLeft:"2rem",fontSize:"1.3rem",textAlign:"left"}}>Suggested answers to help you learn and improvise.</p>
               </div>
            <div className="interview">
            <div className="tick" >
              <AiOutlineCheck style={{fontSize:"1.3rem"}} /></div>
              <p style={{marginLeft:"2rem",fontSize:"1.3rem"}}>Get access to interview recordings.</p>
               </div> 
        </div>

        <div  style={{width:"46%"}}>
        <img src="https://dev-to-uploads.s3.amazonaws.com/uploads/articles/wzv8nzldjwz8gnqizcyb.png" style={{width:"100%",borderRadius:"20px",padding:"10px"}} alt="" />
        </div>
  
    </div>

<div className="w-[28%] m-[auto] text-center">
<h2 className="text-3xl mt-[20px] mb-[4rem] line-">Tailored solution to make you <b><i style={{color:"rgb(15,174,83)"}}>Interview Ready</i></b></h2>
</div>


{/* //cards.......... */}

<div className="flex justify-evenly mb-[4rem]">
<div className="card_Home p-[10px] text-justify"  style={{ boxShadow: 'rgba(17, 17, 26, 0.1) 0px 4px 16px, rgba(17, 17, 26, 0.05) 0px 8px 32px' }}>

  <div className="flex justify-center ">
  <img src="https://interviewprime.ai/assets/question-e0b4dd92.svg" style={{width:"4rem"}} alt="" />
  </div>

<h3 className="text-xl text-center font-semibold mt-[8px] mb-[8px] p-[7px]">Interactive interviews</h3>
<p className="text-justify text-lg">Experience realistic and dynamic interview sessions , that adapts to your responses.</p>
</div>

<div className="card_Home p-[10px] text-justify"  style={{ boxShadow: 'rgba(17, 17, 26, 0.1) 0px 4px 16px, rgba(17, 17, 26, 0.05) 0px 8px 32px' }}>

  <div className="flex justify-center ">
  <img src="https://interviewprime.ai/assets/chats-013bf9e7.svg" style={{width:"4rem"}} alt="" />
  </div>

<h3 className="text-xl text-center font-semibold mt-[8px] mb-[8px]  p-[7px]">Comprehensive Feedback</h3>
<p className="text-justify text-lg">Gain insights on your interview performance, get tailored suggestions to enhance your interview skills.</p>
</div>

<div className="card_Home p-[10px] text-justify"  style={{ boxShadow: 'rgba(17, 17, 26, 0.1) 0px 4px 16px, rgba(17, 17, 26, 0.05) 0px 8px 32px' }}>

  <div className="flex justify-center ">
  <img src="https://interviewprime.ai/assets/star-c4ebfaf0.svg" style={{width:"4rem"}} alt="" />
  </div>

<h3 className="text-xl text-center font-semibold mt-[8px] mb-[8px]  p-[7px]">Comprehensive Feedback</h3>
<p className="text-justify text-lg">Gain insights on your interview performance, get tailored suggestions to enhance your interview skills..</p>
</div>

<div className="card_Home p-[10px] text-justify" style={{ boxShadow: 'rgba(17, 17, 26, 0.1) 0px 4px 16px, rgba(17, 17, 26, 0.05) 0px 8px 32px' }}>

  <div className="flex justify-center ">
  <img src="https://interviewprime.ai/assets/devices-be678adf.svg" style={{width:"4rem"}} alt="" />
  </div>

<h3 className="text-xl text-center font-semibold mt-[8px] mb-[8px]  p-[7px]">Practice anytime, anywhere</h3>
<p className="text-justify text-lg">Receive customised interview and follow-up questions aligned with the skills or role you’re practicing for.</p>
</div>


</div>



<footer className="footer p-10 bg-base-200 text-base-content">
  <nav>
    <header className="footer-title">Services</header> 
    <Link  to="#" className="link link-hover">Branding</Link>
    <Link  to="#" className="link link-hover">Design</Link>
    <Link  to="#" className="link link-hover">Marketing</Link>
    <Link  to="#" className="link link-hover">Advertisement</Link>
  </nav> 
  <nav>
    <header className="footer-title">Company</header> 
    <Link  to="#" className="link link-hover">About us</Link>
    <Link to="#"  className="link link-hover">Contact</Link>
    <Link to="#"  className="link link-hover">Jobs</Link>
    <Link  to="#" className="link link-hover">Press kit</Link>
  </nav> 
  <nav>
    <header className="footer-title">Legal</header> 
    <Link  to="#" className="link link-hover">Terms of use</Link>
    <Link  to="#" className="link link-hover">Privacy policy</Link>
    <Link  to="#" className="link link-hover">Cookie policy</Link>
  </nav> 
  <form>
    <header className="footer-title">Newsletter</header> 
    <fieldset className="form-control w-80">
      <label className="label">
        <span className="label-text">Enter your email address</span>
      </label> 
      <div className="join">
        <input type="text" placeholder="username@site.com" className="input input-bordered join-item" /> 
        <button className="btn btn-primary join-item">Subscribe</button>
      </div>
    </fieldset>
  </form>
</footer>

</div>

  )
}

export default Home
