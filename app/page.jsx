import Feed from "@components/Feed"

const Home = () => {
  return (
    <section className="w-full flex-center flex-col">
        <h1 className="head_text text_center">
            Discover & Share
            <br className="max-md:hidden"/>
            <span className="orange_gradient text-center">
                Sell anything you want
            </span>
        </h1>
        <p className="desc text-center">
            Hudsuller is the first B2C e-commerce platform that allows creators to sell products directly to their audience.
        </p>

        <Feed/>
    </section>
  )
}

export default Home