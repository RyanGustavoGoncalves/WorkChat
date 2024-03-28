import FormAuth from "./components/formAuth/FormAuth";

export default function Auth(): React.FC {

    return (
        <main className="flex h-screen flex-col items-center justify-center p-24 gap-4">
            <FormAuth />
        </main>
    )
}