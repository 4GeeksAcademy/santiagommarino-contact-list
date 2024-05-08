const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			demo: [
				{
					title: "FIRST",
					background: "white",
					initial: "white"
				},
				{
					title: "SECOND",
					background: "white",
					initial: "white"
				}
			]
		},
		actions: {
			// Use getActions to call a function within a fuction
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},
			getAllAgendas: async () => {
				const agendasReq = await fetch(`https://playground.4geeks.com/contact/agendas`, {
					headers: {
						"Content-Type": "application/json"
					}
				});
				const agendasJson = await agendasReq.json()
				setStore({ agendas: agendasJson.agendas })
			},
			getSlugAgenda: async (slug) => {
				const slugReq = await fetch(`https://playground.4geeks.com/contact/agendas/${slug}`, {
					headers: {
						"Content-Type": "application/json"
					}
				});
				const slugJson = await slugReq.json()
				setStore({ slug: slugJson })
				return slugJson
			},
			createSlugAgenda: async (slug) => {
				const createSlugReq = await fetch(`https://playground.4geeks.com/contact/agendas/${slug}`, {
					method: "POST",
					headers: {
						"Content-Type": "application/json"
					}
				})
				if (!createSlugReq) {
					alert("Something Went Wrong")
				} else {
					const createSlugJson = await createSlugReq.json()
					const updatedAgendas = [...getStore().agendas, createSlugJson]
					setStore({ ...getStore(), agendas: updatedAgendas })
				}
			},
			deleteSlugAgenda: async (slug) => {
				const deleteSlugReq = await fetch(`https://playground.4geeks.com/contact/agendas/${slug}`, {
					method: "DELETE",
					headers: {
						"Content-Type": "application/json"
					}
				});
				if (!deleteSlugReq.ok) {
					alert("Something Went Wrong")
				} else {
					const updatedAgendas = getStore().agendas.filter((index) => index !== slug.id)
					setStore({ ...getStore().agendas, agendas: updatedAgendas })
				}
			},
			getContacts: async (slug) => {
				const getContactsReq = await fetch(`https://playground.4geeks.com/contact/agendas/${slug}/contacts`, {
					headers: {
						"Content-Type": "application/json"
					}
				})
				if (!getContactsReq.ok) {
					alert("Something Went Wrong")
				};
				const getContactsJson = await getContactsReq.json()
				setStore({ ...getStore().agendas, contacts: getContactsJson.contacts })
			},
			createContact: async (slug, body) => {
				const createContactReq = await fetch(`https://playground.4geeks.com/contact/agendas/${slug}/contacts`, {
					method: "POST",
					headers: {
						"Content-Type": "application/json"
					},
					body: JSON.stringify(body)
				});
				if (!createContactReq.ok) {
					alert("Something Went Wrong")
				} else {
					const createContactJson = await createContactReq.json()
					const updatedContacts = [...getStore().contacts, createContactJson]
					setStore({ ...getStore(), contacts: updatedContacts })
				}
			},
			deleteContact: async (slug, id) => {
				const deleteContactReq = await fetch(`https://playground.4geeks.com/contact/agendas/${slug}/contacts/${id}`, {
					method: "DELETE",
					headers: {
						"Content-Type": "application/json"
					},
				});
				if (!deleteContactReq.ok) {
					alert("Something Went Wrong")
				} else {
					const updatedContacts = getStore().contacts.filter(el => el.id !== id)
					setStore({ ...getStore().contacts, contacts: updatedContacts })
				}
			},
			updateContact: async (slug, id, body) => {
				const updateContactReq = await fetch(`https://playground.4geeks.com/contact/agendas/${slug}/contacts/${id}`, {
					method: "PUT",
					headers: {
						"Content-Type": "application/json"
					},
					body: JSON.stringify(body)
				});
				if (!updateContactReq.ok) {
					alert("Something Went Wrong Updating Contact")
				} else {

					const updateContactJson = await updateContactReq.json()
					const contactIndex = getStore().contacts.findIndex(contact => contact.id === id)

					if (contactIndex !== -1) {
						const updatedContacts = [...getStore().contacts]
						updatedContacts[contactIndex] = updateContactJson
						setStore({ ...getStore(), contacts: updatedContacts })
					}
				}
			},
			changeColor: (index, color) => {
				//get the store
				const store = getStore();

				//we have to loop the entire demo array to look for the respective index
				//and change its color
				const demo = store.demo.map((elm, i) => {
					if (i === index) elm.background = color;
					return elm;
				});
				setStore({ demo: demo });
			}
		}
	};
};

export default getState;