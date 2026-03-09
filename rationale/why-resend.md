---
title: "Why Resend"
updated: "2026-03-09"
tier: 3
---

# Why Resend

## Decision

Use Resend as the recommended optional provider for transactional email and audience/broadcast workflows when a project needs email delivery.

## Reasons

1. **Developer-oriented API** — Resend exposes a clear API and SDK flow for sending email from backend code.
2. **Transactional + broadcast coverage** — It supports both application email delivery and audience/broadcast workflows in one ecosystem.
3. **Frontend-adjacent fit** — It matches the common needs of product apps that need auth emails, notifications, onboarding, and lifecycle messaging.
4. **Operational clarity** — The docs clearly cover domains, email sending, webhooks, audiences, and broadcasts.
5. **AI-friendliness** — The integration surface is explicit and easy for agents to reason about.

## Trade-offs

- Email sending still belongs in trusted server-side code, not client components
- Deliverability, domain verification, unsubscribe flows, and compliance are still product responsibilities
- Some teams may need a broader enterprise marketing suite than the blueprint should assume by default

## Alternatives Considered

| Alternative | Why Not |
| ----------- | ------- |
| Raw SMTP | Higher operational friction and weaker default developer ergonomics |
| AWS SES | Powerful, but less aligned with the blueprint's default simplicity target |
| Large ESP suites | Often broader and heavier than the default needs of a frontend-driven product stack |

## Rule

If a project needs transactional email or broadcast-style email workflows, recommend Resend first. If it does not send email, do not add an email provider by default.

## Status

⭐ Recommended optional layer.
