(function () {

  if (document.getElementById("observer-entity")) return;

  const entity = document.createElement("div");
  entity.id = "observer-entity";
  entity.innerHTML = `
    <div id="observer-eye">
      <div class="shine left"></div>
      <div class="shine right"></div>
    </div>
  `;

  document.body.appendChild(entity);

  const style = document.createElement("style");
  style.innerHTML = `
    #observer-entity {
      position: fixed;
      inset: 0;
      pointer-events: none;
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 9999;
      opacity: 0.18;
    }

    #observer-eye {
      width: 180px;
      height: 100px;
      background: radial-gradient(ellipse at center, #111 0%, #000 70%);
      border-radius: 50%;
      position: relative;
      box-shadow: 0 0 40px rgba(255,255,255,0.04);
      animation: breathe 7s infinite ease-in-out;
    }

    #observer-eye::before {
      content: "";
      position: absolute;
      inset: 20%;
      background: #000;
      border-radius: 50%;
    }

    .shine {
      position: absolute;
      border-radius: 50%;
      background: rgba(255,255,255,0.8);
    }

    .shine.left {
      width: 5px;
      height: 5px;
      top: 45%;
      left: 48%;
    }

    .shine.right {
      width: 3px;
      height: 3px;
      top: 50%;
      left: 56%;
      opacity: 0.6;
    }

    @keyframes breathe {
      0% { transform: scale(1); }
      50% { transform: scale(1.02); }
      100% { transform: scale(1); }
    }
  `;
  document.head.appendChild(style);

  let tx = 0, ty = 0, cx = 0, cy = 0;
  document.addEventListener("mousemove", e => {
    tx = (e.clientX / window.innerWidth - 0.5) * 8;
    ty = (e.clientY / window.innerHeight - 0.5) * 5;
  });

  function follow() {
    cx += (tx - cx) * 0.04;
    cy += (ty - cy) * 0.04;
    document.getElementById("observer-eye").style.transform =
      `translate(${cx}px, ${cy}px)`;
    requestAnimationFrame(follow);
  }

  follow();

})();
