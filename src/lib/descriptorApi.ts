const API = "https://stopper-service.safeapp.workers.dev/api";

function getFormattedDate() {
    let currentDate = new Date();
    return currentDate.toISOString().split("T")[0];
}

export async function createDescriptor({
    name,
    partner_merchant_id,
    partner_descriptor_id,
    payment_descriptor,
    payment_descriptor_contact,
}: {
    partner_merchant_id?: string;
    partner_descriptor_id?: string;
    name?: string;
    applied_by?: string;
    payment_descriptor: string;
    payment_descriptor_contact: string;
}) {
    const data = {
        partner_merchant_id: "415134",
        partner_descriptor_id: Math.round((Math.random() * 100000)).toString(), // generate this randomly
        name: "curiouslytech"+payment_descriptor+payment_descriptor_contact.slice(-4), // we will be using business name + descriptor + a few characters from contact as per vish latest update
        applied_by: "GATEWAY",
        payment_descriptor,
        payment_descriptor_contact,
        status: "ENABLED",
        start_date: getFormattedDate(),
    };

    return await fetch(`${API}/merchants/415134/descriptors`, {
        method: "POST",
        body: JSON.stringify(data),
    });
}
