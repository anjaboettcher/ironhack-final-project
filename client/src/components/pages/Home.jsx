import React from 'react'
import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <div>
      <div
        id="table-food"
        style={{
          display: 'flex',
          alignItems: 'center',
          flexDirection: 'column',
        }}
      >
        <h1
          class="title"
          style={{
            color: 'black',
            opacity: '0.5',
          }}
        >
          <img
            src={'../images/fork-test-black.png'}
            alt="fork"
            className="img-responsive"
            height="250"
          />
          Forkify
        </h1>

        <button
          className="homepage-button"
          style={{
            border: 'none',
            boxShadow: 'none',
            outline: 'none',
            marginTop: 80,
          }}
        >
          <Link
            style={{
              textDecoration: 'none',
              color: 'white',
            }}
            to={'recipes/explore'}
          >
            Start exploring recipes now!
          </Link>
        </button>
      </div>

      <p>
        Forkify is for food lovers. It is a social recipe book. Follow your
        friends and explore the recipe database to see what your friends have
        been cooking lately. Create and save new recipes and add ingredients to
        your shopping list. All in one place.
      </p>

      <section class="testimonial">
        <div class="container">
          <blockquote class="testimonial" style={{ marginBottom: 0 }}>
            <p style={{ marginBottom: 0 }}>
              "Finally a social network where I can create and share my favorite
              recipes in one place! Love it!"
              <br /> <cite>Alice, satisfied customer</cite>
            </p>
          </blockquote>
        </div>
      </section>

      <div id="food-photography" className="section-member">
        <h1
          style={{
            color: 'black',
            opacity: '0.5',
          }}
          className="title"
        >
          Become a member now!
        </h1>
      </div>

      <footer>
        <container>
          <div class="footer-copyright text-center py-3 container">
            © 2019 Copyright | Created with ♡ by Giulia Gallorini, Anja Böttcher
            and Sebastien Morelle
            <a href="https://mdbootstrap.com/education/bootstrap/">
              {' '}
              @ Ironhack
            </a>
          </div>
        </container>
      </footer>
    </div>
  )
}
