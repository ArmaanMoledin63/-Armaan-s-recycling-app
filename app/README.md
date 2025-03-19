# Recycling Image Classification

A deep learning model for classifying recyclable items using PyTorch Lightning and modern best practices.

## Features

- State-of-the-art EfficientNetV2 architecture
- Mixed precision training
- Wandb integration for experiment tracking
- Hydra for configuration management
- Albumentations for advanced data augmentation
- Multi-GPU training support
- Test-time augmentation
- Model export to ONNX format

## Setup

1. Create a virtual environment:
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

2. Install dependencies:
```bash
pip install -r requirements.txt
```

3. Prepare your dataset in the following structure:
```
data/
├── train/
│   ├── plastic/
│   ├── paper/
│   ├── metal/
│   ├── glass/
│   ├── cardboard/
│   ├── trash/
│   └── organic/
└── val/
    ├── plastic/
    ├── paper/
    ├── metal/
    ├── glass/
    ├── cardboard/
    ├── trash/
    └── organic/
```

4. Configure your training:
```bash
# Edit configs/config.yaml to adjust training parameters
```

5. Start training:
```bash
python train.py
```

## Model Architecture

The model uses EfficientNetV2-S as the backbone with custom classification head and advanced training techniques:

- Label smoothing
- Mixup augmentation
- CutMix augmentation
- Stochastic depth
- Auto-augmentation

## Performance

Typical performance metrics on the validation set:
- Accuracy: ~95%
- F1-Score: ~0.94
- Precision: ~0.93
- Recall: ~0.94

## Inference

For real-time inference:
```bash
python predict.py --image path/to/image.jpg
```

## Export

Export to ONNX format:
```bash
python export.py --checkpoint path/to/checkpoint.ckpt
``` 