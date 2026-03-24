# Instacart Reorder Recommender - Models Documentation

This document provides an overview of the models used in the Instacart Reorder Recommender project. The goal of this project is to predict which products users are likely to reorder based on their previous purchasing behavior.

## Model Overview

The primary model used in this project is the LightGBM (Light Gradient Boosting Machine) classifier. LightGBM is chosen for its efficiency and effectiveness in handling large datasets, making it suitable for the Instacart dataset.

### Key Features of the Model

- **Gradient Boosting Framework**: LightGBM is based on the gradient boosting framework, which builds models in a stage-wise fashion and generalizes them by allowing optimization of arbitrary differentiable loss functions.

- **Handling of Large Datasets**: LightGBM is designed to be distributed and efficient with memory usage, making it capable of handling large datasets like those from Instacart.

- **Support for Categorical Features**: The model can handle categorical features directly, which is beneficial for the Instacart dataset where product IDs and user IDs are categorical.

### Hyperparameters

The model is trained with the following hyperparameters to ensure robustness and avoid overfitting:

- `n_estimators`: Number of boosting iterations (set to 1000).
- `learning_rate`: Step size shrinkage used in update to prevent overfitting (set to 0.05).
- `num_leaves`: Maximum number of leaves in one tree (set to 64).
- `max_depth`: Maximum depth of the tree (set to -1 for no limit).
- `subsample`: Fraction of samples to be used for fitting the individual base learners (set to 0.8).
- `colsample_bytree`: Fraction of features to be used for each tree (set to 0.8).
- `class_weight`: Set to "balanced" to handle class imbalance in reorder predictions.

### Model Training Process

1. **Feature Engineering**: Historical features are computed using prior orders, ensuring no leakage from the training set.
2. **Candidate Generation**: Products are labeled as reordered or not based on their presence in the training set, using only prior orders.
3. **Dataset Creation**: The dataset is split by user ID to avoid data leakage, ensuring that the model is trained on past user behavior without using future information.
4. **Model Training**: The LightGBM model is trained on the prepared dataset, with careful monitoring of performance metrics to prevent overfitting.

### Evaluation Metrics

The model's performance is evaluated using several metrics, including:

- **AUC (Area Under the Curve)**: Measures the ability of the model to distinguish between classes.
- **Accuracy**: The ratio of correctly predicted instances to the total instances.
- **Precision**: The ratio of true positive predictions to the total predicted positives.
- **Recall**: The ratio of true positive predictions to the total actual positives.
- **F1 Score**: The harmonic mean of precision and recall, providing a balance between the two.

### Inference

After training, the model is used to predict probabilities for each user-product pair. The Top-K recommendations are generated based on these probabilities, providing users with personalized product suggestions for their next order.

### Conclusion

This documentation outlines the structure and methodology of the models used in the Instacart Reorder Recommender project. The focus on avoiding data leakage and ensuring robust feature engineering and model training processes is crucial for building a reliable recommendation system.