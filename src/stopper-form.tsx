export default function StopperForm() {
    const handleFormSubmit = (e: SubmitEvent) => {
        e.preventDefault();

        const data = document.querySelector("#form") as HTMLFormElement;

        console.log(data);
        createDescriptors(Object.fromEntries(new FormData(data)));
    };

    return (
        <>
            <div class="flex flex-col">
                <form
                    onSubmit={handleFormSubmit}
                    id="form"
                    class="flex flex-col gap-4"
                >
                    <h1 class="text-4xl font-bold">Create Descriptor</h1>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        class="border h-[35px] rounded-lg px-2"
                        placeholder="Name"
                    />
                    <input
                        type="tel"
                        id="payment_descriptor_contact"
                        name="payment_descriptor_contact"
                        class="border h-[35px] rounded-lg px-2"
                        placeholder="Contact"
                    />
                    <input
                        type="email"
                        id="payment_descriptor"
                        name="payment_descriptor"
                        class="border h-[35px] rounded-lg px-2"
                        placeholder="Email"
                    />
                    <select
                        name="status"
                        id="status"
                        class="h-[35px] border rounded-lg px-2"
                    >
                        <option value="ENABLED">ENABLED</option>
                        <option value="DISABLED">DISABLED</option>
                    </select>
                    <select
                        name="applied_by"
                        id="applied_by"
                        class="h-[35px] border rounded-lg px-2"
                    >
                        <option value="TRANSACTION">TRANSACTION</option>
                        <option value="GATEWAY">GATEWAY</option>
                        <option value="ACQUIRER">ACQUIRER</option>
                        <option value="UNKNOWN">UNKNOWN</option>
                    </select>

                    <button
                        type="submit"
                        class="bg-black text-white h-[35px] rounded-lg"
                    >
                        Submit
                    </button>
                </form>
            </div>
        </>
    );
}

// {"action":"Review your request. Validate it is not a duplicate.","code":409,"description":"The request could not be completed due to a conflict with the resource.","message":"Conflict"}
type DescriptorStatus = "ENABLED" | "DISABLED";

type AppliedBy = "TRANSACTION" | "GATEWAY" | "ACQUIRER" | "UNKNOWN";

type CreateDescriptor = {
    partner_merchant_id: string;
    partner_descriptor_id: string;
    name: string;
    applied_by: AppliedBy;
    payment_descriptor: string;
    payment_descriptor_contact: string;
    status: DescriptorStatus;
    start_date: string;
};

async function createDescriptors(data: any) {
    let descriptorData = data as CreateDescriptor;

    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");
    const formattedDate = `${year}-${month}-${day}`;

    descriptorData["start_date"] = formattedDate;
    descriptorData['partner_merchant_id'] = String(415435);
    descriptorData['partner_descriptor_id'] = Math.round(Math.random() * 10000).toString();

    console.log(descriptorData);

    const res = await fetch(
        "https://stopper-service.safeapp.workers.dev/api/merchants/415435/descriptors",
        {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(descriptorData),
        }
    );

    const jsonres = await res.json();

    if (jsonres['code'] == 409) {
        alert("Error:, " + jsonres['description'])
    } else if (jsonres['code'] == 201){
        alert(jsonres['message'])
    } else {
        alert("Error: " + jsonres['action'])
    }
    return;
}

