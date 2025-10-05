import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';

import { COLORS, SPACING, TYPOGRAPHY } from '@/theme';

interface IButtonProps {
  title: string;
  onPress: () => void | Promise<void>;
  variant?: 'primary' | 'secondary' | 'outline';
  disabled?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
}

/**
 * Reusable Button component with multiple variants
 * Supports async operations with loading state
 */
export const Button: React.FC<IButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  disabled = false,
  loading = false,
  fullWidth = false,
}) => {
  const [isProcessing, setIsProcessing] = useState(false);

  const handlePress = useCallback(async () => {
    if (disabled || loading || isProcessing) return;

    try {
      setIsProcessing(true);
      await onPress();
    } finally {
      setIsProcessing(false);
    }
  }, [onPress, disabled, loading, isProcessing]);

  const isDisabled = disabled || loading || isProcessing;
  const showLoader = loading || isProcessing;

  return (
    <TouchableOpacity
      style={[
        styles.button,
        styles[`${variant}Button`],
        fullWidth && styles.fullWidth,
        isDisabled && styles.disabled,
      ]}
      onPress={handlePress}
      disabled={isDisabled}
      activeOpacity={0.7}
    >
      {showLoader ? (
        <ActivityIndicator
          size="small"
          color={variant === 'outline' ? COLORS.light.primary : '#FFFFFF'}
        />
      ) : (
        <Text style={[styles.buttonText, styles[`${variant}ButtonText`]]}>
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
};

interface ICardProps {
  children: React.ReactNode;
  onPress?: () => void;
  elevated?: boolean;
}

/**
 * Card container component with optional elevation
 * Can be made touchable by passing onPress
 */
export const Card: React.FC<ICardProps> = ({
  children,
  onPress,
  elevated = false,
}) => {
  const Container = onPress ? TouchableOpacity : View;

  return (
    <Container
      style={[styles.card, elevated && styles.cardElevated]}
      onPress={onPress}
      activeOpacity={onPress ? 0.7 : 1}
    >
      {children}
    </Container>
  );
};

interface IBadgeProps {
  text: string;
  variant?: 'success' | 'error' | 'warning' | 'info';
}

/**
 * Badge component for status indicators
 */
export const Badge: React.FC<IBadgeProps> = ({ text, variant = 'info' }) => {
  return (
    <View style={[styles.badge, styles[`${variant}Badge`]]}>
      <Text style={[styles.badgeText, styles[`${variant}BadgeText`]]}>
        {text}
      </Text>
    </View>
  );
};

const createShadow = (elevation: number) => ({
  ...Platform.select({
    ios: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: elevation / 2 },
      shadowOpacity: 0.1 + elevation * 0.03,
      shadowRadius: elevation,
    },
    android: {
      elevation,
    },
  }),
});

const styles = StyleSheet.create({
  // Button styles
  button: {
    paddingVertical: SPACING.sm + 4,
    paddingHorizontal: SPACING.lg,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 44, // Accessibility: minimum touch target
    minWidth: 44,
  },
  primaryButton: {
    backgroundColor: COLORS.light.primary,
  },
  secondaryButton: {
    backgroundColor: COLORS.light.secondary,
  },
  outlineButton: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: COLORS.light.primary,
  },
  fullWidth: {
    width: '100%',
  },
  disabled: {
    opacity: 0.5,
  },
  buttonText: {
    fontSize: TYPOGRAPHY.sizes.md,
    fontWeight: TYPOGRAPHY.weights.semibold,
  },
  primaryButtonText: {
    color: '#FFFFFF',
  },
  secondaryButtonText: {
    color: '#FFFFFF',
  },
  outlineButtonText: {
    color: COLORS.light.primary,
  },

  // Card styles
  card: {
    backgroundColor: COLORS.light.surface,
    borderRadius: 12,
    padding: SPACING.md,
  },
  cardElevated: {
    backgroundColor: '#FFFFFF',
    ...createShadow(3),
  },

  // Badge styles
  badge: {
    paddingVertical: SPACING.xs / 2,
    paddingHorizontal: SPACING.sm,
    borderRadius: 12,
    alignSelf: 'flex-start',
  },
  successBadge: {
    backgroundColor: COLORS.light.success + '20', // 20% opacity
  },
  errorBadge: {
    backgroundColor: COLORS.light.error + '20',
  },
  warningBadge: {
    backgroundColor: COLORS.light.warning + '20',
  },
  infoBadge: {
    backgroundColor: COLORS.light.primary + '20',
  },
  badgeText: {
    fontSize: TYPOGRAPHY.sizes.xs,
    fontWeight: TYPOGRAPHY.weights.semibold,
  },
  successBadgeText: {
    color: COLORS.light.success,
  },
  errorBadgeText: {
    color: COLORS.light.error,
  },
  warningBadgeText: {
    color: COLORS.light.warning,
  },
  infoBadgeText: {
    color: COLORS.light.primary,
  },
});
