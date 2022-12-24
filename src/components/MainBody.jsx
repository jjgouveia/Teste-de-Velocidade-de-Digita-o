import React, { useEffect, useState } from "react";

export default function MainBody() {
  const [testArea, setTesteArea] = useState({});
  const [originText, setOriginText] = useState({});
  const [testWrapper, setTestWrapper] = useState({});
  const [theTimer, setTheTimer] = useState({});

  let timer = [0, 0, 0, 0];
  let interval;
  let timerRunning = false;

  useEffect(() => {
    setTesteArea(document.querySelector("#test-area"));
    setOriginText(document.querySelector("#origin-text p").innerHTML);
    setTestWrapper(document.querySelector(".test-wrapper"));
    setTheTimer(document.querySelector(".timer"));
  }, []);

  function spellCheck() {
    let textEntered = testArea?.value;
    let originTextMatch = originText.substring(0, textEntered.length);

    if (textEntered == originText) {
      clearInterval(interval);
      testWrapper.style.borderColor = "#429890";
    } else {
      if (textEntered == originTextMatch) {
        testWrapper.style.borderColor = "#65CCf3";
      } else {
        testWrapper.style.borderColor = "#E95D0F";
      }
    }
  }

  // Adiciona zero inicial aos números <= 9 (apenas para estética):
  function leadingZero(time) {
    if (time <= 9) {
      time = "0" + time;
    }
    return time;
  }

  // Executa um timer padrão de minuto / segundo / centésimos:
  function runTimer() {
    let currentTime =
      leadingZero(timer[0]) +
      ":" +
      leadingZero(timer[1]) +
      ":" +
      leadingZero(timer[2]);
    theTimer.innerHTML = currentTime;
    timer[3]++;

    timer[0] = Math.floor(timer[3] / 100 / 60);
    timer[1] = Math.floor(timer[3] / 100 - timer[0] * 60);
    timer[2] = Math.floor(timer[3] - timer[1] * 100 - timer[0] * 6000);
  }

  function start() {
    let textEnteredLength = testArea.value.length;
    if (textEnteredLength === 0 && !timerRunning) {
      timerRunning = true;
      interval = setInterval(runTimer, 10);
    }
  }

  function reset() {
    clearInterval(interval);
    interval = null;
    timer = [0, 0, 0, 0];
    timerRunning = false;

    testArea.value = "";
    theTimer.innerHTML = "00:00:00";
    testWrapper.style.borderColor = "grey";
  }

  return (
    <div>
      <main className="main">
        <article className="intro">
          <p>
            {" "}
            Este é um teste de digitação. Seu objetivo é duplicar o texto
            fornecido, EXATAMENTE, no campo abaixo. O timer inicia quando você
            começa a digitar e só para quando o seu texto estiver idêntico ao
            original. Boa sorte!{" "}
          </p>
        </article>
        <section className="test-area">
          <div id="origin-text">
            <p>
              Ítaca deu-te a bela viagem. Sem ela não te porias a caminho. Nada
              mais tem a dar-te. Embora a encontres pobre, Ítaca não te enganou.
              Sábio assim como te tornaste, com tanta experiência, já deves
              ter compreendido o que significam as Ítacas.
            </p>
          </div>

          <div className="test-wrapper">
            <textarea
              id="test-area"
              name="textarea"
              rows="6"
              placeholder="O timer começa quando você começar a digitar."
              onKeyDown={start}
              onKeyUp={spellCheck}
            ></textarea>
          </div>

          <div className="meta">
            <section id="clock">
              <div className="timer">00:00:00</div>
            </section>
            <button id="reset" onClick={reset}>
              Começar novamente
            </button>
          </div>
        </section>
      </main>
    </div>
  );
}
