const cuotasArray = [{
    3: 1.101
},
{
    6: 2.078
},
{
    10: 2.669
},
{
    12: 4.506
},
{
    18: 7.379
},
{
    24: 10.778
},
];

localStorage.setItem("cuotasFinanciacion", JSON.stringify(cuotasArray));


class Financiacion {
    constructor(monto, cuotas) {
        this.monto = monto;
        this.cuotas = cuotas;
        this.porcentajes = JSON.parse(localStorage.getItem("cuotasFinanciacion")).find(cuota => cuota[cuotas]);
    }

    calcularCuota() {
        const porcentaje = this.porcentajes[this.cuotas];
        const montoCuota = this.monto * porcentaje / this.cuotas;
        return montoCuota;
    }
}

const main = document.getElementById("mainId");

const formContainer = document.createElement("div");
formContainer.classList.add("form-group", "mx-auto");
main.appendChild(formContainer);

const inputMonto = `<label for="monto" class="ml-2 mt-2">Monto</label>
<input id="monto" type="number" class="form-control col-12">`;

formContainer.innerHTML += inputMonto;

const buttonContainer = document.createElement("div");
buttonContainer.classList.add("row", "mx-auto", "my-3");
main.appendChild(buttonContainer);

const result = document.createElement("p");
main.appendChild(result);

cuotasArray.forEach(cuota => {
    const key = Object.keys(cuota);
    const button = document.createElement("button");
    button.innerText = key + " cuotas";
    button.classList.add("btn", "btn-primary", "mr-2", "mt-2", "col", "xl-6");
    button.onclick = () => {
        const monto = document.getElementById("monto").value;
        if (isNaN(monto) || monto <= 0) {
            result.innerText = `El monto ingresado no es válido`;
        } else {
            const financiacion = new Financiacion(monto, key);
            const montoCuota = financiacion.calcularCuota();
            result.innerText = `El monto a pagar por cuota es de $${montoCuota.toFixed(2)}.`;
        }
    };
    buttonContainer.appendChild(button);
});

main.classList.add("container");