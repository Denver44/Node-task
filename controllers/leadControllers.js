import Lead from '../models/leadsModel.js';
import { catchAsync, AppError } from '../utils/helper.js';

export const createLead = catchAsync(async (req, res, next) => {
  const newLead = await Lead.create(req.body);
  res.status(201).json({
    status: 'created',
    data: {
      data: newLead,
    },
  });
});

export const updateLeadById = catchAsync(async (req, res, next) => {
  const doc = await Lead.findByIdAndUpdate(req?.params?.id, req?.body, {
    new: true,
    runValidators: true,
  });

  if (!doc) return next(new AppError('No document found with that ID ', 404));

  res.status(201).json({
    status: 'updated',
    data: {
      data: doc,
    },
  });
});

export const getLeadByID = catchAsync(async (req, res, next) => {
  const doc = await Lead.findById(req.params?.id);
  if (!doc) return next(new AppError('No document found with that ID ', 404));
  res.status(200).json({
    status: 'success',
    data: {
      data: doc,
    },
  });
});

export const getAllLeads = catchAsync(async (req, res) => {
  const leads = await Lead.find();
  res.status(200).json({
    status: 'success',
    result: leads.length,
    data: {
      data: leads,
    },
  });
});
