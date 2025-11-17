import classes from './Goal.module.css';

export const Goal = () => {
  return (
    <div className={classes.component}>
      <div className={classes.about}>
        <h3 className={classes.header}>Расскажите о себе</h3>

        <h3 className={classes.header}>Когда вы начали работать в IT?</h3>

        <input type="date" name="deadline" id="" />

        <h3 className={classes.header}>Моя работа мечты</h3>
        <textarea
          placeholder="чтобы фронтендеров в команде было не меньше 3 react на хуках, redux-toolkit, TS можно mobX
                      graphQL, Docker, websockets не знаю, но тоже с удовольствием бы поработал
                      бэкендом не хочу заниматься, пока не получу хорошие компетенции во фронте.
                      Поэтому, на фуллстек позиции не очень хочу.
                      фуллстек на Next исключение )"
          name="goal"
          id=""
          cols={30}
          rows={15}
        />

        <h3 className={classes.header}>Что я уже знаю</h3>

        <ul>
          <li>
            <input name="skill[0]" placeholder="вот это" />
          </li>
          <li>
            <input name="skill[1]" placeholder="и еще вот" />
          </li>
          <li>
            <input name="skill[2]" placeholder="а так же" />
          </li>
        </ul>

        <button>+</button>

        <h3 className={classes.header}>Пройденные собеседования</h3>
        <ul>
          <li>
            <h4>компания</h4>
            <input type="date" name="deadline" id="" />
            <ul>
              <li>Что спросили?</li>
              <li>Где нашлись пробелы?</li>
              <li>Тестовое задание</li>
              <li>
                Когда можно повторить?
                <input type="date" name="deadline" id="" />
              </li>
            </ul>
          </li>
          <li>
            <h4>компания</h4>
            <input type="date" name="deadline" id="" />
            <ul>
              <li>Что спросили?</li>
              <li>Где нашлись пробелы?</li>
              <li>Тестовое задание</li>
              <li>
                Когда можно повторить?
                <input type="date" name="deadline" id="" />
              </li>
            </ul>
          </li>
          <li>
            <h4>компания</h4>
            <input type="date" name="deadline" id="" />
            <ul>
              <li>Что спросили?</li>
              <li>Где нашлись пробелы?</li>
              <li>Тестовое задание</li>
              <li>
                Когда можно повторить?
                <input type="date" name="deadline" id="" />
              </li>
            </ul>
          </li>
        </ul>

        <button>Сохранить</button>
      </div>

      <div className={classes.common_requirements}>
        <h3>Общие требования</h3>

        <p>2+ года коммерческой разработки must</p>

        <h4>JavaScript</h4>
        <ul>
          <li>
            Пройти все темы на сайте <a href="https://learn.javascript.ru">learn.javascript.ru</a>
          </li>
          <li>
            Решить 100 задач уровня Easy на{' '}
            <a href="https://leetcode.com/problemset/javascript/?difficulty=EASY&page=1">Литкод</a>
          </li>
        </ul>
        <a href="/">полная программа</a>

        <h4>TypeScript</h4>
        <ul>
          <li>https://scrimba.com/learn/typescript</li>
          <li>https://www.youtube.com/watch?v=BwuLxPH8IDs</li>
          <li>https://basarat.gitbook.io/typescript/styleguide</li>
        </ul>
        <a href="/">полная программа</a>

        <h4>Git</h4>
        <ul>
          <li>наименование коммитов</li>
          <li>создание веток</li>
          <li>ребейз</li>
        </ul>
      </div>
    </div>
  );
};
