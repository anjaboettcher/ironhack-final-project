import React from 'react'

export default function Home() {
  return (
    <div>
      <div id="table-food">
        <h1 class="title">Forkify</h1>
      </div>

      <p>
        Descriptions to come. Lorem ipsum dolor sit amet, consectetur adipiscing
        elit. Integer consectetur, libero eget bibendum elementum, lorem orci
        rutrum justo, at fermentum neque felis ac ex. Phasellus suscipit dapibus
        ante, eu sodales risus sagittis ut. Phasellus eget augue purus. Sed eget
        auctor felis, egestas vestibulum augue. Aenean pharetra metus quis orci
        consequat dapibus. Integer aliquam aliquet ipsum ut pellentesque.
        Curabitur cursus, nibh ut vehicula maximus, eros libero pretium diam, eu
        luctus nisl mauris a augue. Nulla luctus in orci non vulputate.
        Suspendisse at tortor elit.
      </p>

      <section class="testimonial">
        <div class="container">
          <blockquote class="testimonial">
            <p>
              Finally a social network where I can create and share my favorite
              recipes in one place! Love it!"
            </p>
            <cite>Alice, satisfied customer</cite>
          </blockquote>
        </div>
      </section>

      <div id="food-photography" className="section-member">
        <h1 class="title">Become a member now!</h1>
      </div>
    </div>
  )
}
