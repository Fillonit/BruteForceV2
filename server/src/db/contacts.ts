import mongoose from "mongoose";

const ContactSchema = new mongoose.Schema({
	name: { type: String, required: true },
	email: { type: String, required: true },
	message: { type: String, required: true },
	createdAt: { type: Date, default: Date.now },
	updatedAt: { type: Date, default: Date.now },
});

export const ContactModel = mongoose.model("Contact", ContactSchema);

export const getContacts = () => ContactModel.find();

export const getContactById = (id: string) => ContactModel.findById(id);

export const createContact = (values: Record<string, any>) =>
	new ContactModel(values).save().then((contact) => contact.toObject());

export const updateContact = (id: string, values: Record<string, any>) => {
	return ContactModel.findByIdAndUpdate(id, values).then((contact) =>
		contact.toObject()
	);
};

export const deleteContactById = (id: string) =>
	ContactModel.findOneAndDelete({ _id: id });

export const getRecentContacts = () =>
	ContactModel.find().sort({ createdAt: -1 }).limit(3);
