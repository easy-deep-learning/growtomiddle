export const Goal = () => {
  return (
    <div className={''}>
      <textarea
        placeholder="Опишите работу мечты"
        name="goal" id=""
        cols={30} rows={10}
      />

      <p>
        <select name="category" id="">
          <option value="1">ReactJS</option>
          <option value="1">TS</option>
          <option value="1">Redux</option>
          <option value="1">Saga</option>
        </select>
      </p>
      <ul>
        <li><input name="skill[0]" placeholder="Навык" /></li>
        <li><input name="skill[1]" placeholder="Навык" /></li>
        <li><input name="skill[2]" placeholder="Навык" /></li>
        <li><input name="skill[3]" placeholder="Навык" /></li>
        <li><input name="skill[4]" placeholder="Навык" /></li>
        <li><input name="skill[5]" placeholder="Навык" /></li>
        <li><input name="skill[6]" placeholder="Навык" /></li>
      </ul>

      <p>
        К какому сроку получить работу,: <br/>
        <input type="date" name="deadline" id="" />
      </p>

      <button>Сохранить</button>
    </div>
  )
}
