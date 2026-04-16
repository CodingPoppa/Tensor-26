import tensorflow as tf
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Dense, Dropout

# Build a Sequential model
model = Sequential()

# Hidden layer 1
model.add(Dense(128, activation='relu', input_shape=(784,)))
model.add(Dropout(0.5))  # <-- Dropout after Dense

# Hidden layer 2
model.add(Dense(128, activation='relu'))
model.add(Dropout(0.5))  # <-- Dropout after Dense

# Hidden layer 3
model.add(Dense(64, activation='relu'))
model.add(Dropout(0.5))  # <-- Dropout after Dense

# Output layer (example: 10‑class classification)
model.add(Dense(10, activation='softmax'))

# Print architecture
model.summary()