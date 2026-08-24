import Listen from "../../resources/sound_max_fill.svg";
import Copy from "../../resources/Copy.svg";
import SortAlfa from "../../resources/Sort_alfa.svg";

function Container() {
  return (
    <section>
      <div>
        <p style={{ fontSize: "0.875rem" }}>Detect Language</p>
      </div>

      <hr />

      <form action="">
        <textarea name="" id="" rows={6} maxLength={500}></textarea>
      </form>

      <p>19/500</p>

      <div>
        <div>
          <img src={Listen} alt="listen" className="icons" />
          <img src={Copy} alt="copy" className="icons" />
        </div>

        <div>
          <img src={SortAlfa} alt="character" />
          <p>Translate</p>
        </div>
      </div>
    </section>
  );
}

export default Container;
