import Lead from '../models/leadsModel.js';

export const createLead = async (req, res) => {
  try {
    const lead = await Lead.create(req.body);
    res.status(201).json({
      status: 'created',
      data: {
        data: lead,
      },
    });
  } catch (err) {
    res.status(400).json({
      error,
    });
  }
};

export const getLeadByID = async (req, res) => {
  try {
    const doc = await Lead.findById(req.params?.id);

    if (!doc) throw Error;

    res.status(200).json({
      status: 'success',
      data: {
        data: doc,
      },
    });
  } catch (error) {
    res.status(500).json({
      error: 'No document found with that ID',
    });
  }
};

export const getAllLeads = async (req, res) => {
  try {
    const leads = await Lead.find();
    res.status(200).json({
      status: 'success',
      data: {
        data: leads,
      },
    });
  } catch (error) {
    res.status(404).json({
      error: 'No document exist',
    });
  }
};

export const updateLeadById = async (req, res) => {
  try {
    const doc = await Lead.findByIdAndUpdate(req?.params?.id, req?.body, {
      new: true,
      runValidators: true,
    });
    if (!doc) throw Error;

    res.status(201).json({
      status: 'updated',
      data: {
        data: doc,
      },
    });
  } catch (error) {
    res.status(404).json({
      error: 'No document found with that ID',
    });
  }
};
