import PageLayout from '@/components/layouts/PageLayout'

const index = () => {
  return (
    <PageLayout>
      <h1>About Bear Watch </h1>
      <p>
        At Bear Watch, our mission is to empower outdoor enthusiasts and
        adventurers with a tool that can make their wilderness experiences safer
        and more enjoyable.
      </p>
      <p>
        We understand that exploring the wild can sometimes be unpredictable,
        and our goal is to provide a helping hand when you need it most.
      </p>
      <h2 className='font-bold'>Disclaimer</h2>
      <p>
        Bear Watch Bear Watch is a web application created for educational
        purposes and may be displayed in a web development portfolio.
      </p>
      <h3 className='font-bold'>Please be aware of the following</h3>
      <ul>
        <li>
          <h3>Educational and Demonstration Use</h3>
          <p>
            Bear Watch is not intended for real-world or commercial use. It has
            been developed to showcase web development skills and may not have
            the full range of features or security measures found in production
            applications.
          </p>
        </li>
        <li>
          <h3>Limited Functionality</h3>
          <p>
            The app&apos;s features are intentionally limited to demonstrate
            specific functionalities and may not offer the full functionality
            expected in a real-world application.
          </p>
        </li>
        <li>
          <h3>Data Handling</h3>
          <p>
            Bear Watch may not adhere to the same rigorous security and privacy
            standards as production apps. Use this app with the understanding
            that it may not meet the same data protection and privacy practices
            required for operational applications.
          </p>
        </li>
        <li>
          <h3>No Guarantee</h3>
          <p>
            Bear Watch does not guarantee your safety or the effectiveness of
            its services. The use of the app is at your own risk, and we do not
            accept liability for any consequences of using the app.
          </p>
        </li>
        <li>
          <h3>Safety and Emergency Use</h3>
          <p>
            Bear Watch should not be used for genuine safety or emergency
            situations. It is not intended to provide emergency services or
            replace the need for professional assistance in outdoor or
            wilderness settings.
          </p>
        </li>
      </ul>
      <p>
        By using Bear Watch, you acknowledge its educational and portfolio
        nature and the limitations of its functionality.
      </p>
    </PageLayout>
  )
}

export default index
