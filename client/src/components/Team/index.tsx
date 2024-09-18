import React from 'react'
import './style.scss'
import felz from '../../assets/images/dp.jpeg'
const Team = () => {
  return (
    <section className="team-section">
      {/* <h1>
        Welcome to <span>Crypto</span>Matrix
      </h1> */}
      <h1>
        Meet the <span>Crypto</span>Matrix team
      </h1>
      <p>
        Your ultimate recipe haven where you can discover and share delicious
        moments. Our journey began with a shared love for cooking and the desire
        to make the culinary world more accessible to everyone.
      </p>
      <div className="team-cards">
        <div className="card">
          <img src={felz} alt="Felicity Essien" />
          <h2>Felicity Essien</h2>
          <p>Developer/Content</p>
        </div>
        <div className="card">
          <img src={felz} alt="Kassim Sallah" />
          <h2>Godfrey Dekew</h2>
          <p>Developer/Content</p>
        </div>
      </div>
    </section>
  )
}

export default Team
