import { shallow, configure } from "enzyme";
import HomePage from "../components/HomePage";
import Adapter from "enzyme-adapter-react-16";
configure({ adapter: new Adapter() });

describe("HomePage Component Test", () => {
  let component;
  beforeEach(() => {
    component = shallow(<HomePage />);
  });

  it("Div Container", () => {
    const comp = component.find(".container-fluid");
    expect(comp.length).toBe(1);
  });

  it("Chat Bot", () => {
    const comp = component.find(".bot");
    expect(comp.length).toBe(1);
  });
});
