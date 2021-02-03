import { shallow, configure, mount, render } from "enzyme";
import NavbarComponent from "../components/NavbarComponent";
import Adapter from "enzyme-adapter-react-16";
configure({ adapter: new Adapter() });

describe("Navbar Component Test", () => {
  let config = [
    {
      productID: "PROD123",
      id: "car insurance",
      title: "Car Insurance",
      text: "Car Insurance provided by Tata AIG",
      imageSrc: "https://image.flaticon.com/icons/png/512/55/55283.png",
      navigationPath: "/car-insurance",
      backgroundImage:
        "https://i.pinimg.com/736x/01/f9/86/01f986b246dcaf4505405a7bfe0492d2.jpg",
    },
    {
      productID: "PROD124",
      id: "car insurance",
      title: "Bike Insurance",
      text: "Car Insurance provided by Tata AIG",
      imageSrc: "https://image.flaticon.com/icons/png/512/55/55283.png",
      navigationPath: "/bike-insurance",
      backgroundImage:
        "http://www.yuppee.com/wp-content/uploads/2013/06/cars-for-sale.jpg",
    },
  ];
  const wrapper = render(<NavbarComponent config={config} />);

  it("renders child correctly", () => {
    expect(wrapper.find("ul").children()).toHaveLength(config.length + 3);
  });

  it("renders child correctly", () => {
    expect(
      wrapper
        .find("ul")
        .children()
        .find("a")
    ).toHaveLength(config.length + 3);
  });
});
