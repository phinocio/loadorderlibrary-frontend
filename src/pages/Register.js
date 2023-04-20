"use strict";
exports.__esModule = true;
var react_1 = require("react");
var react_router_dom_1 = require("react-router-dom");
var AuthProvider_1 = require("../context/AuthProvider");
var InputError_1 = require("@/components/InputError");
function Register() {
    var register = (0, AuthProvider_1["default"])().register;
    var _a = (0, react_1.useState)(''), name = _a[0], setName = _a[1];
    var _b = (0, react_1.useState)(null), errors = _b[0], setErrors = _b[1];
    var _c = (0, react_1.useState)(''), password = _c[0], setPassword = _c[1];
    var _d = (0, react_1.useState)(''), passwordConfirmation = _d[0], setPasswordConfirmation = _d[1];
    var submitForm = function (e) {
        e.preventDefault();
        register({
            name: name,
            password: password,
            password_confirmation: passwordConfirmation,
            setErrors: setErrors
        });
    };
    return (<div className="flex flex-col content-center items-center justify-center px-4 text-xl">
			<div className="justify-startp-5 flex flex-col items-center">
				<h1 className="text-5xl text-gray-600">Register</h1>
				<react_router_dom_1.Form className="mt-5 flex flex-col space-y-4" method="post" onSubmit={submitForm}>
					<div>
						<label htmlFor="name" className="relative block">
							<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="pointer-events-none absolute left-4 top-1/2 h-6 w-6 -translate-y-1/2 transform text-green-500">
								<path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"/>
							</svg>
							<input type="text" name="name" id="name" value={name} onChange={function (e) { return setName(e.target.value); }} className="block w-full rounded-full border border-gray-900 bg-gray-600 px-4 py-3 pl-14 placeholder-gray-400" placeholder="Username..." required/>
						</label>
						{(errors === null || errors === void 0 ? void 0 : errors.name) && (<InputError_1["default"] message={errors.name[0]} className="mt-2"/>)}
					</div>

					<div>
						<label htmlFor="password" className="relative block">
							<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="pointer-events-none absolute left-4 top-1/2 h-6 w-6 -translate-y-1/2 transform text-green-500">
								<path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"/>
							</svg>

							<input type="password" name="password" id="password" value={password} onChange={function (e) { return setPassword(e.target.value); }} className="block w-full rounded-full border border-gray-900 bg-gray-600 px-4 py-3 pl-14 placeholder-gray-400" placeholder="Password..." required/>
						</label>

						{(errors === null || errors === void 0 ? void 0 : errors.password) && (<InputError_1["default"] message={errors.password[0]} className="mt-2"/>)}
					</div>

					<div>
						<label htmlFor="password-confirm" className="relative block">
							<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="pointer-events-none absolute left-4 top-1/2 h-6 w-6 -translate-y-1/2 transform text-green-500">
								<path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"/>
							</svg>

							<input type="password" name="password" id="password-confirm" value={passwordConfirmation} onChange={function (e) {
            return setPasswordConfirmation(e.target.value);
        }} className="block w-full rounded-full border border-gray-900 bg-gray-600 px-4 py-3 pl-14 placeholder-gray-400" placeholder="Password Confirm..." required/>
						</label>
						{(errors === null || errors === void 0 ? void 0 : errors.password_confirmation) && (<InputError_1["default"] message={errors.password_confirmation[0]} className="mt-2"/>)}
					</div>

					<section className="flex items-center justify-between">
						<react_router_dom_1.Link to="/login" className="text-sm text-gray-400 underline hover:text-gray-600">
							Already Registered?
						</react_router_dom_1.Link>
						<button type="submit" className="rounded px-2 py-1 hover:bg-blue-500">
							Register
						</button>
					</section>
				</react_router_dom_1.Form>
			</div>
		</div>);
}
exports["default"] = Register;
