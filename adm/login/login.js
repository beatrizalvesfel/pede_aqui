class FormSubmit {
	constructor(settings) {
		this.settings = settings;
		this.form = document.querySelector(settings.form);
		this.formButton = document.querySelector(settings.button);
		if (this.form) {
			this.url = this.form.getAttribute('action');
		}
		this.sendForm = this.sendForm.bind(this);
	}

	displaySuccess() {
		this.form.innerHTML = this.settings.success;
	}

	displayError() {
		this.form.innerHTML = this.settings.error;
	}

	getFormObject() {
		const formObject = {};
		const fields = this.form.querySelectorAll('[name]');
		fields.forEach((field) => {
			formObject[field.getAttribute('name')] = field.value;
		});
		return formObject;
	}

	onSubmission(event) {
		event.preventDefault();
		event.target.disabled = true;
		event.target.innerText = 'Enviando...';
	}

	async sendForm(event) {
		try {
			this.onSubmission(event);
			await fetch(this.url, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Accept: 'application/json',
				},
				body: JSON.stringify(this.getFormObject()),
			});
			this.displaySuccess();
		} catch (error) {
			this.displayError();
			throw new Error(error);
		}
	}

	init() {
		if (this.form) this.formButton.addEventListener('click', this.sendForm);
		return this;
	}
}

const formSubmit = new FormSubmit({
	form: '[data-form]',
	button: '[data-button]',
	success: "<h1 class='success'>Login realizado com sucesso!</h1>",
	error:
		"<h1 class='error'>Não foi possivel realizar o login. Tente novamente.</h1>",
});
formSubmit.init();

const icon = document.getElementById('icon');
let password = document.getElementById('password');

function mostrarSenha() {
	if (password.type === 'password') {
		password.type = 'text';
		icon.classList.remove('fa-eye');
		icon.classList.add('fa-eye-slash');
	} else {
		password.type = 'password';
		icon.classList.remove('fa-eye-slash');
		icon.classList.add('fa-eye');
	}
}
