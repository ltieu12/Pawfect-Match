function Input({label, type, name, inputRef}) {
    return (
        <div>
            <label className="block font-medium">
                {type === "checkbox" ? (
                    <div className="flex items-center">
                        <input
                            className="w-5 h-5 rounded focus:ring-primary shadow-sm ring-1 ring-inset"
                            type={type}
                            name={name}
                            ref={inputRef} 
                        />
                        <span className="ml-2">{label}</span>
                    </div>
                ) : type === "textarea" ? (
                    <>
                        {label}:
                        <textarea className="pl-3 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset placeholder:text-gray-400 focus:ring-inset focus:ring-indigo-600"
                            name={name}
                            ref={inputRef}
                        />
                    </>
                ) : (
                    <>
                        {label}:
                        <input className="pl-3 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset placeholder:text-gray-400 focus:ring-inset focus:ring-indigo-600"
                            type={type}
                            name={name}
                            ref={inputRef}
                        />
                    </>
                )
            }
            </label>
        </div>
    )
}

export default Input;