import React from 'react'
import { Link } from 'react-router-dom'
import { Container } from 'reactstrap'

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
          className="title"
          style={{
            color: 'black',
            opacity: '0.6',
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

      <h5
        style={{
          display: 'block',
          marginTop: '40px',
          marginBottom: '40px',
          marginRight: '50px',
          marginLeft: '50px',
        }}
      >
        Forkify is for food lovers. It is a social recipe book. Follow your
        friends and explore the recipe database to see what your friends have
        been cooking lately. Create and save new recipes and add ingredients to
        your shopping list. All in one place.
      </h5>

      <section className="testimonial">
        <div>
          <blockquote className="testimonial" style={{ marginBottom: 0 }}>
            <p style={{ marginBottom: 0, fontStyle: 'italic' }}>
              "Finally a social network where I can create and share my favorite
              recipes in one place! Love it!"
              <br />{' '}
              <cite style={{ fontSize: '12px', textAlign: 'center' }}>
                -- Alice, satisfied customer
              </cite>
            </p>
          </blockquote>
        </div>
      </section>

      <div
        id="food-photography"
        className="section-member"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <span
          style={{
            color: 'black',
            opacity: '0.6',
            fontSize: '40px',
            marginRight: '60px',
            marginLeft: '60px',
          }}
          className="title text-center"
        >
          Become a member now!
        </span>
      </div>

      <footer>
        <Container>
          <div className="footer-copyright text-center py-3 text-muted">
            © 2019 Copyright | Created with ♡ by Giulia Gallorini, Anja Böttcher
            and Sebastien Morelle
            <a href="https://mdbootstrap.com/education/bootstrap/">
              {' '}
              @ Ironhack
            </a>
          </div>
        </Container>
      </footer>
    </div>
  )
}
