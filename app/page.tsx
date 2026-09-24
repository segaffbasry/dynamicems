import Hero from "@/components/Hero";
import Markets from "@/components/Markets";
import PostCard from "@/components/PostCard";
import { Arrow, Eyebrow, Pill, TextLink } from "@/components/ui";
import { posts } from "@/lib/posts";
import { film, live, pillars } from "@/lib/site";

export default function Home() {
  return <>
    <Hero />

    {/* Heart Aerospace's ES-36 moment: a giant sticky wordmark on a falling gradient, with the brand's swirl passing over it. */}
    <section className="wordmark" data-scene="sky" aria-label="We are Dynamic">
      <div className="wordmark-sticky"><p className="display wordmark-text" aria-hidden="true">Dynamic<span>.</span></p></div>
      <div className="wordmark-swirl" aria-hidden="true" />
      <p className="wordmark-caption wrap" data-rise>We are Dynamic – we are your product solutions architect</p>
    </section>

    <section className="section" id="welcome" data-scene="white">
      <div className="wrap split">
        <div>
          <Eyebrow>Welcome</Eyebrow>
          <h2 className="heading" data-rise>No two customers are the same.</h2>
        </div>
        <div className="split-body">
          <p className="lede" data-rise>At Dynamic EMS we understand that no two customers are the same. Their products, their supply chains and their markets all differ. This is why Dynamic EMS offers a tailor-made, customised Electronics Manufacturing Service to customers with a complex, highly-diversified business.</p>
          <p data-rise>From design to distribution, we enable our customers to be more competitive by bringing innovative solutions to market faster, with a commitment to quality in everything we do.</p>
          <div data-rise><TextLink href={`${live}/about-us/`}>About Dynamic EMS</TextLink></div>
        </div>
      </div>
    </section>

    <section className="section section-tight" data-scene="white" aria-labelledby="revolution">
      <div className="wrap">
        <Eyebrow>The Industrial Revolution</Eyebrow>
        <h2 className="heading heading-wide" id="revolution" data-rise>Dynamic EMS facilitate its Original Equipment Manufacturing (OEM) partners growth by:</h2>
        <ul className="pairs">
          <li className="pair">
            <div className="pair-media" data-clip>{/* eslint-disable-next-line @next/next/no-img-element */}<img data-parallax src="/brand/DEMS-Rotator-3.jpg" alt="A Dynamic EMS test engineer at a workstation" loading="lazy" /></div>
            <div className="pair-copy"><span className="pair-index" data-rise>01</span><h3 data-rise>Enabling educated OEMs to evolve</h3></div>
          </li>
          <li className="pair pair-flip">
            <div className="pair-media" data-clip>{/* eslint-disable-next-line @next/next/no-img-element */}<img data-parallax src="/brand/DEMS-Rotator-2.jpg" alt="Engineers at work in a product development studio" loading="lazy" /></div>
            <div className="pair-copy"><span className="pair-index" data-rise>02</span><h3 data-rise>Enabling developmental OEMs to accelerate</h3></div>
          </li>
        </ul>
        <p className="statement" data-rise>Quite simply, we dynamically enable all types of technology companies to optimise their performance.</p>
      </div>
    </section>

    <section className="section" data-scene="mist" aria-labelledby="pillars">
      <div className="wrap">
        <div className="section-head">
          <Eyebrow>We are Dynamic</Eyebrow>
          <h2 className="heading" id="pillars" data-rise>From design to distribution.</h2>
        </div>
        <ol className="pillar-list">
          {pillars.map((pillar, index) => <li key={pillar.name} data-rise>
            <a href={pillar.href}><span className="pillar-index">0{index + 1}</span><span className="pillar-name">{pillar.name}</span><span className="pillar-note">{pillar.note}</span><Arrow /></a>
          </li>)}
        </ol>
      </div>
    </section>

    <section className="film" data-scene="black" aria-labelledby="film-title">
      <div className="film-media" data-clip>{/* eslint-disable-next-line @next/next/no-img-element */}<img data-parallax src="/brand/DEMS-Greyscale-Swirl4Full.jpg" alt="" loading="lazy" /></div>
      <div className="film-copy wrap">
        <Pill href={film} external>Play film</Pill>
        <h2 className="display film-title" id="film-title" data-rise>We are your product solutions architect</h2>
        <p data-rise>Operating across diversified markets, our many years of experience and investment in state of the art technology enables us to support your PCB Assembly and electronic product build throughout the product life cycle.</p>
      </div>
    </section>

    <section className="section" data-scene="white" aria-labelledby="markets">
      <div className="wrap">
        <div className="section-head section-head-row">
          <div><Eyebrow>Markets</Eyebrow><h2 className="heading" id="markets" data-rise>Enabling scale, scope & speed</h2></div>
          <div data-rise><TextLink href={`${live}/market-sectors/`}>All market sectors</TextLink></div>
        </div>
        <Markets />
      </div>
    </section>

    <section className="section" data-scene="mist" aria-labelledby="news">
      <div className="wrap">
        <div className="section-head section-head-row">
          <div><Eyebrow>Dynamic News</Eyebrow><h2 className="heading" id="news" data-rise>Latest from the Media Hub</h2></div>
          <p className="section-intro" data-rise>Operating across diversified markets, our many years of experience and investment in state of the art technology enables us to support your PCB Assembly and electronic product build throughout the product life cycle, from prototype, through test and customer delivery, anywhere around the globe.</p>
        </div>
        <div className="post-grid post-grid-4">{posts.slice(0, 4).map((post) => <PostCard key={post.slug} post={post} />)}</div>
        <div className="section-foot" data-rise><TextLink href="/news">All {posts.length} stories</TextLink></div>
      </div>
    </section>
  </>;
}
