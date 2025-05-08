const API = "https://stopper-service.safeapp.workers.dev/api"

function getFormattedDate() {
    let currentDate = new Date()
    return currentDate.toISOString().split('T')[0]
}


export async function CreateDescriptor({name, partner_merchant_id, partner_descriptor_id, payment_descriptor, payment_descriptor_contact}:{partner_merchant_id: string, partner_descriptor_id: string, name: string, applied_by: string, payment_descriptor: string, payment_descriptor_contact: string}) {
    const data = {
        partner_merchant_id,
        partner_descriptor_id, // randomly generated
        name,
        applied_by: "GATEWAY",
        payment_descriptor,
        payment_descriptor_contact,
        status: 'ENABLED',
        start_date: getFormattedDate()
    };

    return await fetch(API, {
        method: "POST",
        body: JSON.stringify(data)
    })
}